import { NextFunction, Request, Response } from "express";
import { Schema, validate } from "jsonschema";
import * as db from "../../db/queries";
import { ResponseUtl } from "../../middlewares/response";
import { User } from "../../db/entity/user";

// const getUserByIdSchema: Schema = {
//   type: "object",
//   properties: {
//     id: { type: "string" },
//   },
//   required: ["id"],
//   additionalProperties: false,
// }

export default async function getUserById(request: Request, response: Response, next: NextFunction) {
  // try {
    let user = await db.getUserById(parseInt(request.params.id));
      return ResponseUtl.sendResponse<User>(response, "User Found", user);
  // } catch (err) {
  //   console.error(err);
  //   return response.status(500).json({failure: "Internal server error"});
  // }
}

// interface GetUserByIdRequest extends Request {
//   body: {
//     id: string;
//   };
// }