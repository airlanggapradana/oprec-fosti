const env = {
  PORT: process.env.PORT as string,
  MONGO_URI: process.env.DATABASE_URL as string,
};

export default env;
