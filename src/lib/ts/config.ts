export default interface Config {
  version: number;
  port: number;
  basicAuthUser: string;
  basicAuthSecret: string;
  bodyParserMax: string;
  urlEncodedMax: string;
  databaseOptions: {
    port: number;
    user: string;
    host: string;
    database: string;
    password: string;
  };
}