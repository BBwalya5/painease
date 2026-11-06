export class BaseRepository {
  constructor(database) {
    if (!database) {
      throw new TypeError("A database adapter is required");
    }
    this.database = database;
  }
}
