# Simple Full Stack app

## Main Components

This project consists of the following main components:

1. **Client**: The front-end part of the application built with React.
2. **Server**: The back-end part of the application built with Node.js and Express.
3. **Database**: PostgreSQL is used as the database to store application data.

## How to Run the App

Follow these steps to run the application:

1. **Clone the repository**:
  ```sh
  git clone https://github.com/yourusername/simple-react-full-stack.git
  cd simple-react-full-stack
  ```

2. **Install dependencies for both client and server**:
  ```sh
  npm install
  cd client
  npm install
  cd ..
  ```

3. **Set up environment variables**:
  Create a `.env` file in the root directory and add the following:
  ```
  DATABASE_URL=your_postgresql_url
  PORT=your_port
  ```

4. **Start the application**:
  ```sh
  npm start
  ```

5. **Access the application**:
  Open your browser and go to `http://localhost:your_port`.

## Scripts

- `npm start`: Starts both the client and server concurrently.
- `npm run server`: Starts the Express server.
- `npm run client`: Starts the React development server.

## License

This project is licensed under the MIT License.
  PORT=your_port
  ```

4. **Run the server**:
  ```sh
  npm run server
  ```

5. **Run the client**:
  Open a new terminal window and run:
  ```sh
  npm run client
  ```

6. **Access the application**:
  Open your browser and go to `http://localhost:your_port`.

## Scripts

- `npm run server`: Starts the Express server.
- `npm run client`: Starts the React development server.
- `npm run dev`: Runs both the client and server concurrently.

## License

This project is licensed under the MIT License.