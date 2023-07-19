import express, { Request, Response, NextFunction } from 'express';
import basicAuth, { BasicAuthResult } from 'basic-auth';
import config from "../config";

export default function authenticate(request: Request, response: Response, next: NextFunction): void {
  const credentials: BasicAuthResult | undefined = basicAuth(request);

  if (!credentials || !isValidCredentials(credentials.name, credentials.pass)) {
    response.status(401).set("WWW-Authenticate", "Basic realm='Authentication required'").end();
  } else {
    next();
  }
}

function isValidCredentials(username: string, password: string): boolean {
  return username === config.basicAuthUser && password === config.basicAuthSecret;
}