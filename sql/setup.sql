-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS desserts;

CREATE TABLE desserts (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    item TEXT NOT NULL,
    calories INT NOT NULL
);