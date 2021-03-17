import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);

const app = express();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
