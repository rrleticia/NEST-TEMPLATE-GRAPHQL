export default () => ({
  app: {
    name: process.env.APP_NAME ?? '',
    version: process.env.APP_VERSION ?? '1.0.0',
    port: process.env.APP_PORT ?? 3000,
    prefix: process.env.APP_PREFIX ?? 'api',
  },
  env: {
    env: process.env.NODE_ENV ?? 'development',
  },
  postgresql: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    issuer: process.env.JWT_SECRET_ISSUER,
  },
  bycrypt: {
    saltRounds: Number(process.env.SALT_ROUNDS) ?? 11,
  },
  admin: {
    password: process.env.ADMIN_PASSWORD,
  },
  hmac: {
    cursorSecret: process.env.CURSOR_SECRET,
  },
});
