export default interface Config {
  version: number;
  port: number;
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