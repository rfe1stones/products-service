export default interface DatabaseConfig {
  user: string,
  password: string,
  port: number,
  database: string,
  socketPath?: string,
  host?: string
};
