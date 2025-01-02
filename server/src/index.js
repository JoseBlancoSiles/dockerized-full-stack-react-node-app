const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 8080;

require('dotenv').config();

// Configuración de CORS
app.use(cors());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Verificar la conexión a la base de datos
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to the database');
  release();
});

// Endpoint de ping
app.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('INSERT INTO pings (message) VALUES ($1) RETURNING *', ['pong']);
    res.json({ message: 'pong', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting into database:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Crear la tabla pings si no existe
pool.query(`
  CREATE TABLE IF NOT EXISTS pings (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err, res) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table pings is ready');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});