import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpiration: "7d",
    refreshTokenExpiration: "7d",
  },
<<<<<<< Updated upstream
=======
  test_jwt: process.env.TEST_JWT,
  database: {
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
>>>>>>> Stashed changes
};

export default config;
