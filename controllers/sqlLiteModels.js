

let data = {};

data.location = `CREATE TABLE location(
id INT PRIMARY KEY ,
longitude NUMERIC,
latitude NUMERIC,
place_name TEXT,
radius INTEGER
);`

data.clue = `CREATE TABLE clue(
id INT PRIMARY KEY,
description TEXT,
location_id NUMERIC,
completed BOOLEAN
);`

data.user = `CREATE TABLE user(
curr_clue NUMERIC
);`

export default data;