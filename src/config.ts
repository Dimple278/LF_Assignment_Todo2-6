import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION || "1d",
    refreshTokenExpiration: process.env.JWT_REFRESH_EXPIRATION || "7d",
  },
};

export default config;
