import mysql from "mysql2/promise";

export class MySqlDatabaseAdapter {
  constructor(config) {
    this.config = config;
    this.pool = null;
  }

  async connect() {
    if (this.pool) {
      return this.pool;
    }

    this.pool = mysql.createPool({
      host: this.config.host,
      port: this.config.port,
      database: this.config.name,
      user: this.config.user,
      password: this.config.password,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      timezone: "Z",
    });

    await this.pool.query("SELECT 1");
    return this.pool;
  }

  async disconnect() {
    if (!this.pool) {
      return;
    }

    await this.pool.end();
    this.pool = null;
  }

  async query(sql, params = []) {
    if (!this.pool) {
      await this.connect();
    }
    return this.pool.execute(sql, params);
  }
}

export function createMySqlDatabase(config) {
  return new MySqlDatabaseAdapter(config);
}
