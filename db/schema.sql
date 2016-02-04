DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS types;

CREATE TABLE games(
       id serial UNIQUE PRIMARY KEY,
       name text NOT NULL,
       m integer NOT NULL,
       n integer NOT NULL,
       k integer NOT NULL,
       p integer DEFAULT 1,
       q integer DEFAULT 1
);


