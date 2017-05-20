

let data = {};

data.location = `CREATE TABLE IF NOT EXISTS location(
id INT PRIMARY KEY ,
longitude NUMERIC,
latitude NUMERIC,
place_name TEXT,
radius INTEGER
);`

data.clue = `CREATE TABLE IF NOT EXISTS clue(
id INT PRIMARY KEY,
description TEXT,
location_id NUMERIC,
completed BOOLEAN
);`

data.user = `CREATE TABLE IF NOT EXISTS user(
curr_clue NUMERIC
);`

export default data;