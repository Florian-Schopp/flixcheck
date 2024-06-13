import express from "express";
import logger from "morgan";
import cors from "cors";
import apiRouter from "./routes/api";
const port = process.env.PORT ?? 4000;
const app = express();
app.set("query parser", (queryString: any) => new URLSearchParams(queryString));

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use((_req, resp) => {
  resp.status(404).end();
});

app.listen(port, () => {
  logger(`[server]: Server is running at http://localhost:${port}`);
});
