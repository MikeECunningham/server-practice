import { Pool } from "pg";
import config from "./config";

const pool = new Pool({
  user: config.databaseOptions.user,
  host: config.databaseOptions.host,
  database: config.databaseOptions.database,
  password: config.databaseOptions.password,
  port: config.databaseOptions.port,
});

export async function init() {
  try {
    let created = await pool.query(
      `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(200),
        lastName VARCHAR(200),
        email VARCHAR(254) UNIQUE,
      )
      `
    );
    return created;
  } catch (err) {
    console.error("Problem in DB init: " + err);
    return null;
  }
}

export async function getUsers() {
  let query = await pool.query("SELECT * FROM users ORDER BY id ASC");
  if (query.rows.length > 0) {
    return query.rows;
  }
  return [];
}
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

export async function updateUser(firstName: string, lastName: string, email: string, id: string) {

}