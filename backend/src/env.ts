const env = {
  PORT: process.env.PORT as string,
  MONGO_URI: process.env.DATABASE_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
};

export default env;
