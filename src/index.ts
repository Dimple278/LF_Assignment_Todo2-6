import express from "express";
import bodyParser from "body-parser";
import config from "./config";
import router from "./routes/taskRoutes";
import errorMiddleware from "./middleware/errorMiddleware";
import userRouter from "./routes/userRoutes";
import { requestLogger } from "./middleware/logger";

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(bodyParser.json());
app.use(router);
app.use(userRouter);

app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`Server listening at port:${config.port}`);
});
