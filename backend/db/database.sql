CREATE DATABASE `task_management_tool_tut`;

CREATE TABLE user_accountss(
  ID SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE tasks(
  ID SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR NOT NULL,
  completed BOOLEAN DEFAULT false NOT NULL,
  userId INT REFERENCES user_accountss(ID) ON DELETE CASCADE NOT NULL
);

INSERT INTO user_accounts(name, email, password) VALUES('admin', 'test@example.com', '123');