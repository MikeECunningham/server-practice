import { Pool } from "pg";
import config from "./config";

const pool = new Pool({
  user: config.databaseOptions.user,
  host: config.databaseOptions.host,
  database: config.databaseOptions.database,
  password: config.databaseOptions.password,
  port: config.databaseOptions.port,
});

export async function createUser(firstName: string, lastName: string, email: string) {
  try {
    let results = await pool.query(
      "INSERT INTO users (firstName, lastName, email) values ($1, $2, $3) RETURNING *",
      [firstName, lastName, email]
    );
    if (results.rows.length > 0) {
      return results.rows[0].id;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function updateUser(firstName: string, lastName: string, email: string, id: string) {

}