import { Request, Response } from "express";
import * as db from "../../queries";

export default async function getUsers(request: Request, response: Response) {
  try {
    let users = await db.getUsers();
    response.status(200).json(users);
  } catch (err) {
    console.error(err);
    return response.json({ failure: "Internal server error" });
  }
}