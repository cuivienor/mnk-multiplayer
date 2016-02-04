DROP TABLE IF EXISTS challanges;
DROP TABLE IF EXISTS games;


CREATE TABLE games(
       id serial UNIQUE PRIMARY KEY,
       name text NOT NULL,
       m integer NOT NULL,
       n integer NOT NULL,
       k integer NOT NULL,
       p integer DEFAULT 1,
       q integer DEFAULT 1
);

CREATE TABLE challanges(
       id serial UNIQUE PRIMARY KEY,
       url varchar(15),
       game_id integer REFERENCES games(id)
);
