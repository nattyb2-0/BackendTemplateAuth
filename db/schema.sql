
drop table if exists users;

create table users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE ,
  email VARCHAR(150) NOT NULL,
  password VARCHAR(150) NOT NULL,
  created_on timestamp  DEFAULT   CURRENT_TIMESTAMP
)
