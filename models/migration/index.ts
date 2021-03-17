import mariadb from 'mariadb';
import * as dotenv from 'dotenv';
import ParseCSV from './ParseCSV';

// dotenv.config();

// mariadb.createConnection({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   port: parseInt(process.env.DB_PORT as string),
//   socketPath: process.env.DB_SOCKET_PATH,
//   database: process.env.DB_NAME,
// }).then(conn => {
//   console.log('success?');
// })
// .catch(err => {
//   console.log('error', err);
// });

interface Product {
  id: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: number
}

const mapToProduct = function(array: any[]): Product {
  return {
    id: array[0],
    name: array[1],
    slogan: array[2],
    description: array[3],
    category: array[4],
    default_price: array[5]
  };
}

const logProduct = function(product: Product) {
  console.log(product);
}

let filePath = '/home/stephen/hr/sdc/products/data/full/product.csv';
let parser = new ParseCSV(filePath);
parser.read<Product>(mapToProduct, logProduct);
