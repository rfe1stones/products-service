import * as dotenv from 'dotenv';
import express from 'express';
import productRouter from './routes/routes';
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);
const app = express();

app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.json({
    text: 'home'
  });
});

if (process.env.LOADERIO_TOKEN) {
  const token = process.env.LOADERIO_TOKEN;
  app.get('/loaderio-f520ea98449eba6552ab4b7392e350fb/', (req, res) => {
    res.send(token);
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
