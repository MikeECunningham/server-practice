import { Pool } from "pg";
import config from "./config";

const pool = new Pool({
  user: config.databaseOptions.user,
  host: config.databaseOptions.host,
  database: config.databaseOptions.database,
  password: config.databaseOptions.password,
  port: config.databaseOptions.port,
});

export async function getUsers() {
  let query = await pool.query("SELECT * FROM users ORDER BY id ASC");
  if (query.rows.length > 0) {
    return query.rows;
  }
  return [];
}
export async function createUser(name: string, email: string) {
  try {
    let results = await pool.query(
      "INSERT INTO users (name, email) values ($1, $2) RETURNING *",
      [name, email]
    );
    if (results.rows.length > 0) {
      return results.rows[0].id;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function getUserById(id: string) {
  let query = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  if (query.rows.length > 0) {
    return query.rows[0];
  }
  return null;
}

export async function updateUser(name: string, email: string, id: string) {

}