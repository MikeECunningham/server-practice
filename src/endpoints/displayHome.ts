import { Request, Response } from "express";

export default function displayHome(request: Request, response: Response) {
  response.json({
    response: "pong",
    timestamp: Date.now()
  })
}