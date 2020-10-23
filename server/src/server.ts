import express from 'express';
// import { connect } from "./database/database";
const app = express();
const port = 5000;
import moviesRoutes from './routes/api/movies';
import cors from 'cors';

// connect();
app.use(express.json());
app.use(cors());

app.use('/api/movies', moviesRoutes);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
