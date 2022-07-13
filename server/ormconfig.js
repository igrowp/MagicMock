const env = process.env;
const appIsDev = env.APP_ENV === "dev";

module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "123456",
  database: "magic_mock",
  synchronize: true,
  entities: appIsDev ? ["**/entitys/*.{ts,js}"] : ["build/entitys/*.{ts,js}"],
};
