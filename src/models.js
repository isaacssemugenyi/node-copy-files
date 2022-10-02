const sqlite3 = require('sqlite3').verbose();
const client = require('./queries');

class CopyModel {
  // create new database
  constructor(database) {
    this.db = database;
  }

  database() {
    if (!this.db)
      throw new Error('A database name should be provided. But non was found.');

    return new sqlite3.Database(this.db, (err) => {
      err
        ? console.error(err.message)
        : console.log(`${this.db} successfully created`);
    });
  }

  createATable(table) {
    this.database();
    this.database().serialize(() => {
      this.database().run(`${table}`, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
    });
  }

  findAllFolders() {
    return new Promise((resolve, reject) => {
      this.database().all(`${client.findAllFolderPairs()}`, [], (err, rows) => {
        if (err) {
          throw err;
        }
        resolve(rows);
      });
    });
  }

  findAllLogs() {
    return new Promise((resolve, reject) => {
      this.database().all(`${client.findAllLogs()}`, [], (err, rows) => {
        if (err) {
          throw err;
        }
        resolve(rows);
      });
    });
  }

  findInterval() {
    return new Promise((resolve, reject) => {
      this.database().all(
        `${client.findCurrentInterval()}`,
        [],
        (err, rows) => {
          if (err) {
            throw err;
          }
          resolve(rows);
        }
      );
    });
  }

  createAFolderPair(folderPair) {
    return new Promise((resolve, reject) => {
      const { src_slug, src_path, dest_slug, dest_path, created_at } =
        folderPair;

      this.database().run(
        `${client.createANewFolderPair()}`,
        [
          `${src_slug}`,
          `${src_path}`,
          `${dest_slug}`,
          `${dest_path}`,
          `${created_at}`,
        ],
        function (err) {
          if (err) {
            return console.log(err.message);
          }
          return resolve({
            id: this.lastID,
            ...folderPair,
          });
        }
      );
    });
  }

  createALog(newLog) {
    return new Promise((resolve, reject) => {
      const { log, created_at } = newLog;

      this.database().run(
        `${client.createANewLog()}`,
        [`${log}`, `${created_at}`],
        function (err) {
          if (err) {
            return console.log(err.message);
          }
          return resolve({
            id: this.lastID,
          });
        }
      );
    });
  }

  createAnInterval(newInterval) {
    return new Promise((resolve, reject) => {
      const { second, minute, hour, day, week, month, created_at } =
        newInterval;

      this.database().run(
        `${client.createANewInterval()}`,
        [
          `${second}`,
          `${minute}`,
          `${hour}`,
          `${day}`,
          `${week}`,
          `${month}`,
          `${created_at}`,
        ],
        function (err) {
          if (err) {
            return console.log(err.message);
          }
          return resolve({
            id: this.lastID,
            ...newInterval,
          });
        }
      );
    });
  }

  updateAFolder(folder) {
    return new Promise((resolve, reject) => {
      const {
        src_slug,
        src_path,
        dest_slug,
        dest_path,
        created_at,
        last_updated_at,
        id,
      } = folder;
      this.database().run(
        `${client.updateAFolderPair()}`,
        [
          src_slug,
          src_path,
          dest_slug,
          dest_path,
          created_at,
          last_updated_at,
          id,
        ],
        function (err) {
          if (err) {
            return console.log(err.message);
          }
          return resolve({
            id,
            ...folder,
          });
        }
      );
    });
  }
}

// function findById(id) {
//   return new Promise((resolve, reject) => {
//     db.get(`${FIND_BY_ID}`, [id], (err, row) => {
//       if (err) return console.error(err.message);
//       if (row) {
//         return resolve(row);
//       } else {
//         return resolve({ message: `No product found with the id ${id}` });
//       }
//     });
//   });
// }

const model = new CopyModel('copy.db');
model.createATable(client.createIntervalsQuery());
model.createATable(client.createFolderQuery());
model.createATable(client.createLogsQuery());

module.exports = model;
