class DatabaseQueries {
  // Creating a new folders table
  createFolderQuery() {
    return `CREATE TABLE IF NOT EXISTS folders(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        src_slug VARCHAR(50) NOT NULL,
        src_path VARCHAR(250) NOT NULL,
        dest_slug VARCHAR(50) NOT NULL,
        dest_path VARCHAR(250) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        last_updated_at TIMESTAMP
    )`;
  }

  //   Creating a new logs table
  createLogsQuery() {
    return `CREATE TABLE IF NOT EXISTS logs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        log VARCHAR(300) NOT NULL,
        created_at TIMESTAMP
    )`;
  }

  //   Creating a new interval table
  createIntervalsQuery() {
    return `CREATE TABLE IF NOT EXISTS intervals(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        second VARCHAR(10),
        minute VARCHAR(10) NOT NULL,
        hour VARCHAR(10) NOT NULL,
        day VARCHAR(10) NOT NULL,
        week VARCHAR(10) NOT NULL,
        month VARCHAR(10) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        last_updated_at TIMESTAMP
    )`;
  }

  //   Find all folders records stored in the db
  findAllFolderPairs() {
    return `SELECT * FROM folders`;
  }

  //   Find all logs stored in the db
  findAllLogs() {
    return `SELECT * FROM logs`;
  }

  //   Find  interval stored in the db
  findCurrentInterval() {
    return `SELECT * FROM intervals`;
  }

  //   Create a new folder record
  createANewFolderPair() {
    return `INSERT INTO folders(
        src_slug,
        src_path,
        dest_slug,
        dest_path,
        created_at
    ) VALUES(?, ?, ?, ?, ?)`;
  }

  //   Create a new log record
  createANewLog() {
    return `INSERT INTO logs(
        log,
        created_at
    ) VALUES(?, ?)`;
  }

  //   Create a new interval record
  createANewInterval() {
    return `INSERT INTO intervals(
        second,
        minute,
        hour,
        day,
        week,
        month,
        created_at
    ) VALUES(?, ?, ?, ?, ?, ?, ?)`;
  }

  updateAFolderPair() {
    return `UPDATE folders set 
        src_slug = COALESCE(?,src_slug), 
        src_path = COALESCE(?,src_path), 
        dest_slug = COALESCE(?,dest_slug),
        dest_path = COALESCE(?,dest_path),
        created_at = COALESCE(?,created_at),
        last_updated_at = COALESCE(?,last_updated_at)
        WHERE id = ?`;
  }
}

const client = new DatabaseQueries();

module.exports = client;
