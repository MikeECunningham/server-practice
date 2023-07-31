import { NextFunction, Request, Response } from "express";
import * as db from "../../db/queries";
import { ResponseUtl } from "../../middlewares/response";

export default async function getUsers(request: Request, response: Response, next: NextFunction) {
  let page = (!!request.params.page) ? parseInt(request.params.page) : 1;
  let pageSize = (!!request.params.pageSize) ? parseInt(request.params.pageSize) : 10;
  if (pageSize > 200) { pageSize = 10; }
  let users = await db.getUsers(page, pageSize);
  return ResponseUtl.sendResponse(response, `Found ${users.records.length} users`, users);
}