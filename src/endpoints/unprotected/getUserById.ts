import { Request, Response } from "express";
import { Schema, validate } from "jsonschema";
import * as db from "../../queries";

// const getUserByIdSchema: Schema = {
//   type: "object",
//   properties: {
//     id: { type: "string" },
//   },
//   required: ["id"],
//   additionalProperties: false,
// }

export default async function getUserById(request: Request, response: Response) {
  try {
      let user: any[] = await db.getUserById(request.params.id);
      if (!!user) {
        return response.status(200).json({user});
      }
      return response.status(404).json({failure: "ID not found"});
  } catch (err) {
    console.error(err);
    return response.status(500).json({failure: "Internal server error"});
  }
}

// interface GetUserByIdRequest extends Request {
//   body: {
//     id: string;
//   };
// }