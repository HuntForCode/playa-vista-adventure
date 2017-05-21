import Expo, { SQLite } from 'expo';

import data from './sqlLiteModels';


const db = Expo.SQLite.openDatabase('projectDB');

// db.transaction(tx => {
//   console.log("create table")
//   tx.executeSql('DROP TABLE location'); 
//   tx.executeSql(data.location); //create the location table
//   tx.executeSql('INSERT INTO location VALUES (2, -118.4222983, 33.979500, "CodeSmith", 80)');
//   tx.executeSql('INSERT INTO location VALUES (1, -118.4182312, 33.9767221, "Whole Foods", 130)'); //insert first row

//   tx.executeSql('INSERT INTO location VALUES (3, -118.422547, 33.977925, "4hr zone", 160)');
//   tx.executeSql('INSERT INTO location VALUES (4, -118.4267177, 33.9671522, "Playa Vista Sports Park", 400)');
//   tx.executeSql('select * from location', [], (_, { rows }) => {
//     console.log(JSON.stringify(rows));
//   }
//   );
// });

// db.transaction(tx => {
//   tx.executeSql('DROP TABLE clue');
//   tx.executeSql(data.clue); //create the location table
//   tx.executeSql('INSERT INTO clue VALUES (12, "Home for the next 12 weeks...", 2, 0)');
//   tx.executeSql('INSERT INTO clue VALUES (11, "Popular choice for lunch...", 1, 0)');
//   tx.executeSql('INSERT INTO clue VALUES (13, "Every juniors nightmare (for an exponenet hint: Dont lose track of time!)...", 3, 0)');
//   tx.executeSql('INSERT INTO clue VALUES (14, "Where seniors got there butts kicked...", 4, 0)');
//   tx.executeSql('select * from clue', [], (_, { rows }) => {
//     console.log(JSON.stringify(rows));
//   }
//   );
// });

// db.transaction(tx => {
//   tx.executeSql('DROP TABLE user');
//   tx.executeSql(data.user);

// });

export default db;