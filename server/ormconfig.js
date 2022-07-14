const env = process.env;
const appIsDev = env.APP_ENV === 'dev';
module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: env.DB_ACCOUNT,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  entities: appIsDev ? [__dirname + '/src/entitys/*.{ts,js}'] : [__dirname + '/build/entitys/*.{ts,js}']
};
