import Config from "./lib/ts/config";
import dotenv from "dotenv";

dotenv.config();

const config: Config = {
  version: 1,
  port: parseInt(process.env.PORT as string),
  basicAuthUser: (process.env.BA_USER as string),
  basicAuthSecret: (process.env.BA_PASSWORD as string),
  bodyParserMax: "4MB",
  urlEncodedMax: "1MB",
  databaseOptions: {
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER as string,
    host: process.env.DB_HOST as string,
    database: process.env.DB_DATABASE as string,
    password: process.env.DB_PASSWORD as string,
  }
}

export default config;