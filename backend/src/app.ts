import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import cors from "cors"
import apiRouter from './routes/api';
const port = process.env.PORT || 4000;
const app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use((_req, resp) => {
  resp.status(404).end()
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
