import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  refreshSecretKey: process.env.REFRESH_SECRET_KEY,
};

export default config;
