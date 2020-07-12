
const config = {
    env: process.env.ENV || 'development',
    port: process.env.PORT || '7000',
    database: {
      name: 'manage-tournament',
      username: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1',
    }
  };
  
module.exports.config = config;
  