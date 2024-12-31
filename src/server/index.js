require('dotenv').config();
const express = require('express');
const multer = require('multer'); // Import multer for handling file uploads
const { Client } = require('pg');
const csv = require('csv-parser');
const stream = require('stream');

const app = express();

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'text/csv') {
            return cb(new Error('Only CSV files are allowed!'), false);
        }
        cb(null, true);
    }
});

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect();

app.use(express.static('dist'));

app.post('/api/uploadCsv', upload.single('csvFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded or invalid file type.');
    }

    const results = [];
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    bufferStream
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', async () => {
            try {
                for (const row of results) {
                    await client.query('INSERT INTO names (name, surname) VALUES ($1, $2)', [row.name, row.surname]);
                }
                res.send('File uploaded and stored successfully');
            } catch (dbErr) {
                res.status(500).send('Failed to store file in database');
            }
        });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));