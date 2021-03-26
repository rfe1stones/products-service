import mariadb, { Connection } from 'mariadb';
import * as dotenv from 'dotenv';
import DatabaseConfig from '../database/types/DatabaseConfig';

dotenv.config();

if (process.env.DB_PORT === undefined) {
  throw new Error('.env file must contain DB_PORT value');
}

if (process.env.DB_USER === undefined) {
  throw new Error('.env file must contain DB_USER value');
}

if (process.env.DB_PASS === undefined) {
  throw new Error('.env file must contain DB_PASS value');
}

if (process.env.DB_NAME === undefined) {
  throw new Error('.env file must contain DB_NAME value');
}

let connection_config: DatabaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_NAME
};

if (process.env.DB_SOCKET_PATH && process.env.DB_SOCKET_PATH !== '') {
  connection_config['socketPath'] = process.env.DB_SOCKET_PATH;
}

const connection = mariadb.createConnection(connection_config)
  .catch((err) => {
    console.log(err);
  });

export default connection;