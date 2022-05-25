require('dotenv').config({path: '../../.env'})


module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : process.env.DATABASE_HOST,
      port : 3306,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PASSWORD,
      database : process.env.DATABASE_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host : process.env.DATABASE_HOST,
      port : 3306,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PASSWORD,
      database : process.env.DATABASE_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host : process.env.DATABASE_HOST,
      port : 3306,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PASSWORD,
      database : process.env.DATABASE_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  migrations: {
    directory: __dirname + 'libs/knex/migrations',
  },
  seeds: {
    directory: __dirname + 'libs/knex/seeds'
  }
};
