import { DataSource, EntityManager } from "typeorm";
import { User } from "./entity/user";
import config from "../config";

const DB = new DataSource({
  type: "postgres",
  host: config.databaseOptions.host,
  // url: "localhost",
  port: config.databaseOptions.port,
  username: config.databaseOptions.user,
  password: config.databaseOptions.password,
  database: config.databaseOptions.database,
  entities: ["dist/db/entity/*.js"],
  subscribers: [],
  migrations: ["dist/db/migrations/*.js"],
  synchronize: false,
  logging: false,
  migrationsTransactionMode: "each",
});

export default DB;