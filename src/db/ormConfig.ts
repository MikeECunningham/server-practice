import { DataSource, EntityManager } from "typeorm";
import { User } from "./entity/user";

export const connectDB = new DataSource({
  type: "postgres",
  url: "localhost",
  port: parseInt(process.env.DB_PORT as string),
  username: (process.env.DB_USER as string),
  password: (process.env.DB_PASSWORD as string),
  database: (process.env.DB_DATABASE as string),
  entities: ["src/entity/*.js"],
  synchronize: true,
  logging: false,
});

connectDB.initialize().then(() => { console.log("Postgres initialized"); })
  .catch((err) => { console.error(err) });

export const manager = connectDB.manager;



export const userRepository = connectDB.getRepository(User);