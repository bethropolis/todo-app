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
const db = new DB('todoApp', {
    Tasks: '++id, title, description, categoryId',
    Categories: '++id, name',
    Tags: '++id, name'
  });
  
  // Define the logic for your todo app
  class TodoApp {
    // Method to add a task
    static async addTask(title, description, categoryId) {
      try {
        const task = { title, description, categoryId };
        const taskId = await db.Tasks.add(task);
        console.log('Task added with ID:', taskId);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  
    // Method to get all tasks
    static async getAllTasks() {
      try {
        const tasks = await db.Tasks.toArray();
        console.log('All Tasks:', tasks);
      } catch (error) {
        console.error('Error getting tasks:', error);
      }
    }
  
    // Method to get tasks by category
    static async getTasksByCategory(categoryId) {
      try {
        const tasks = await db.Tasks.where('categoryId').equals(categoryId).toArray();
        console.log(`Tasks with Category ID ${categoryId}:`, tasks);
      } catch (error) {
        console.error('Error getting tasks by category:', error);
      }
    }
  
    // Method to add a category
    static async addCategory(name) {
      try {
        const category = { name };
        const categoryId = await db.Categories.add(category);
        console.log('Category added with ID:', categoryId);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  
    // Method to get all categories
    static async getAllCategories() {
      try {
        const categories = await db.Categories.toArray();
        console.log('All Categories:', categories);
      } catch (error) {
        console.error('Error getting categories:', error);
      }
    }
  
    // Method to add a tag
    static async addTag(name) {
      try {
        const tag = { name };
        const tagId = await db.Tags.add(tag);
        console.log('Tag added with ID:', tagId);
      } catch (error) {
        console.error('Error adding tag:', error);
      }
    }
  
    // Method to get all tags
    static async getAllTags() {
      try {
        const tags = await db.Tags.toArray();
        console.log('All Tags:', tags);
      } catch (error) {
        console.error('Error getting tags:', error);
      }
    }
  }
  
  // Example usage
  (async () => {
    // Add categories
    await TodoApp.addCategory('Personal');
    await TodoApp.addCategory('Work');
  
    // Add tags
    await TodoApp.addTag('Urgent');
    await TodoApp.addTag('Important');
  
    // Add tasks
    await TodoApp.addTask('Task 1', 'Description 1', 1);
    await TodoApp.addTask('Task 2', 'Description 2', 2);
    await TodoApp.addTask('Task 3', 'Description 3', 1);
  
    // Get all tasks
    await TodoApp.getAllTasks();
  
    // Get tasks by category
    await TodoApp.getTasksByCategory(1);
  
    // Get all categories
    await TodoApp.getAllCategories();
  
    // Get all tags
    await TodoApp.getAllTags();
  })();
  