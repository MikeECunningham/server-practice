import { Request, Response, NextFunction } from "express";
import { EntityNotFoundError } from "typeorm";
import { ResponseUtl } from "./response";

export function handleErrors(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  }
}

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof EntityNotFoundError) {
    return ResponseUtl.sendError(
      res,
      "Entity Not Found",
      null,
      404,
    )
  }

  return ResponseUtl.sendError(res, "Internal Server Error", null, 500);
}