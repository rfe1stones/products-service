import mariadb, { Connection } from 'mariadb';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = mariadb.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT as string),
  socketPath: process.env.DB_SOCKET_PATH,
  database: process.env.DB_NAME
}).catch((err) => {
  console.log(err);
});

export default connection;