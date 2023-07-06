import { Request, Response } from "express";
import { Schema, validate } from "jsonschema";
import * as db from "../../queries";

const createUserSchema: Schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" }
  },
  required: ["name", "email"],
  additionalProperties: false,
}

export default async function createUser(request: CreateUserRequest, response: Response) {
  try {
    let valid = validate(request.body, createUserSchema);
    if (valid.valid) {
      request.body.email = request.body.email.toLocaleLowerCase().trim();
      let id = await db.createUser(request.body.name, request.body.email);
      if (!!id) {
        return response.status(200).json({id});
      }
      return response.status(500).json({ failure: "Internal database error" });
    }
    return response.status(400).json({ failure: "Bad request, send {name: string, email: string}"});
  } catch (err) {
    console.error(err);
    return response.status(500).json({ failure: "Internal server error" });
  }
}

interface CreateUserRequest extends Request {
  body: {
    name: string;
    email: string;
  };
}