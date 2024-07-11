import express from "express";
import config from "./config";
import router from "./routes/taskRoutes";
import errorMiddleware from "./middleware/errorMiddleware";
import userRouter from "./routes/userRoutes";
import { requestLogger } from "./middleware/logger";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import cors from "cors";
import ApiError from "./error/apiError";

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  max: 10,
  message: new ApiError(429, "Too many requests, please try again later."),
});

const allowedOrigins = ["https://www.test.com", "https://www.google.com"];

app.use(helmet());
app.use(limiter);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new ApiError(403, "Not Allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(userRouter);

app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`Server listening at port:${config.port}`);
});
