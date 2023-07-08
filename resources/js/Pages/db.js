import Dexie from 'dexie';

// A JS class that wraps Dexie.js major functions
export class DB {
  // Constructor takes a database name and an optional schema object
  constructor(dbName, schema = {}) {
    // Create a new Dexie instance with the given name
    this.db = new Dexie(dbName);
    // Define the schema if given
    if (Object.keys(schema).length > 0) {
      this.db.version(1).stores(schema);
    }
    // Open the database connection
    this.open();
    // Create a proxy to handle dynamic table creation
    return new Proxy(this, {
      get(target, prop) {
        // If the property is a table name, create it if it doesn't exist
        if (typeof prop === "string" && !target.db[prop]) {
          target.db.version(1).stores({ [prop]: "++id" });
        }
        // Return the original property or the table instance
        return target[prop] || target.db[prop];
      },
    });
  }

  // A method to open the database connection if it's closed
  async open() {
    if (!this.db.isOpen()) {
      await this.db.open();
    }
  }

  // A method to add a new record to a table
  async add(table, data) {
    // Check if the table exists
    if (!this.db[table]) {
      throw new Error(`Table ${table} does not exist`);
    }
    // Open the database connection if it's closed
    await this.open();
    // Try to add the data and return the generated key
    try {
      const key = await this.db[table].add(data);
      return key;
    } catch (error) {
      // Handle any error
      console.error(error);
      throw error;
    }
  }

  // A method to get a record by key from a table
  async get(table, key) {
    // Check if the table exists
    if (!this.db[table]) {
      throw new Error(`Table ${table} does not exist`);
    }
    // Open the database connection if it's closed
    await this.open();
    // Try to get the record and return it
    try {
      const record = await this.db[table].get(key);
      return record;
    } catch (error) {
      // Handle any error
      console.error(error);
      throw error;
    }
  }

  // A method to update a record by key in a table
  async update(table, key, data) {
    // Check if the table exists
    if (!this.db[table]) {
      throw new Error(`Table ${table} does not exist`);
    }
    // Open the database connection if it's closed
    await this.open();
    // Try to update the record and return the number of updated records
    try {
      const count = await this.db[table].update(key, data);
      return count;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // A method to delete a record by key from a table
  async delete(table, key) {
    // Check if the table exists
    if (!this.db[table]) {
      throw new Error(`Table ${table} does not exist`);
    }
    // Open the database connection if it's closed
    await this.open();
    // Try to delete the record and return the number of deleted records
    try {
      const count = await this.db[table].delete(key);
      return count;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // A method to query records from a table using Dexie's query syntax
  async query(table, query) {
    // Check if the table exists
    if (!this.db[table]) {
      throw new Error(`Table ${table} does not exist`);
    }
    // Open the database connection if it's closed
    await this.open();
    // Try to execute the query and return a Dexie.Collection instance
    try {
      const result = await this.db[table].where(query).toArray();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // A method to sort the records by a field or a function
  async sortBy(table, fieldOrFn) {
    // Check if the table exists
    if (!this.db[table]) {
      throw new Error(`Table ${table} does not exist`);
    }
    // Open the database connection if it's closed
    await this.open();
    // Try to sort the records and return a Dexie.Collection instance
    try {
      const result = await this.db[table].orderBy(fieldOrFn).toArray();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // A method to filter the records by a function or an array of functions
  async filterBy(table, fnOrFns) {
    // Check if the table exists
    if (!this.db[table]) {
      throw new Error(`Table ${table} does not exist`);
    }
    // Open the database connection if it's closed
    await this.open();
    // Try to filter the records and return a Dexie.Collection instance
    try {
      const result = await this.db[table].filter(fnOrFns).toArray();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // A method to limit the number of records to return
  async limit(table, num) {
    // Check if the table exists
    if (!this.db[table]) {
      throw new Error(`Table ${table} does not exist`);
    }
    // Open the database connection if it's closed
    await this.open();
    // Try to limit the records and return a Dexie.Collection instance
    try {
      const result = await this.db[table].limit(num).toArray();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

// Instantiate the DB class with the database name and schema
export const db = new DB('todo', {
  Todo: '++id, &title, category,labels, date, done, deleted',
  Categories: '++id, &category, &name, color',
  Sync: '++id, type, itemId, time',
  User: 'id, &name'
});
