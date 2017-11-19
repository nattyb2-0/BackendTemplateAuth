//require pg-promise module to database connections
const pg = require('pg-promise')({});

const pgConfig = {  host:     process.env.PG_HOST,
                    port:     process.env.PG_PORT,
                    database: process.env.PG_DATABASE,
                    user:     process.env.PG_USER,
                    password: process.env.PG_PASSWORD };

//instantiate pg module
const db = pg(pgConfig);

module.exports = db;
