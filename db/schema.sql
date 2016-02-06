DROP TABLE IF EXISTS challanges;
DROP TABLE IF EXISTS games;


CREATE TABLE games(
       id serial UNIQUE PRIMARY KEY,
       name text NOT NULL,
       type text NOT NULL,
       params text
);

CREATE TABLE challanges(
       id serial UNIQUE PRIMARY KEY,
       url varchar(15),
       game_id integer REFERENCES games(id)
);
