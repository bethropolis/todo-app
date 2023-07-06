import { db } from "./db";





// Define the logic for your todo app
export class Todo {


    static async addSync(type, itemId) {
        try {
            const date = new Date();
            const sync = { type, itemId, time: date }
            const SyncId = await db.Sync.add(sync);
            localStorage.setItem("syncId",SyncId );
            console.log('Task sync with ID:', SyncId);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }


    // Method to add a task
    static async addTodo(title, category,labels = []) {
        try {
            const date = new Date();
            const task = { title, category,labels, date, done: false, delete: false };
            const taskId = await db.Todo.add(task);
            await this.addSync('add', taskId);
            console.log('Task added with ID:', taskId);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    // Method to get all Todo
    static async getAllTodo() {
        try {
            const Todo = await db.Todo.toArray();
            await Todo.forEach(async (item,index) => {
              const category = await db.Categories.where('id').equals(item.category).toArray();  
              Todo[index].category = category[0]|| null;
            });
             return Todo;
        } catch (error) {
            console.error('Error getting Todo:', error);
        }
    }

    // Method to get Todo by category
    static async getTodoByCategory(category) {
        try {
            const Todo = await db.Todo.where('category').equals(category).toArray();
            return Todo;
        } catch (error) {
            console.error('Error getting Todo by category:', error);
        }
    }

    // Method to add a category
    static async addCategory(name,color = "#ae6071") {
        try {
            const category = { name, color };
            const categoryID = await db.Categories.add(category);
            console.log('Category added with ID:', categoryID);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    }  
    
    // Method to get all categories
    static async getCategory(id) {
        try {
            const category = await db.Categories.where('id').equals(id).toArray();
             return category;
        } catch (error) {
            console.error('Error getting categories:', error);
        }
    }

    // Method to get all categories
    static async getAllCategories() {
        try {
            const categories = await db.Categories.toArray();
            categories.forEach(async (item, index)=>{
                const all = await db.Todo.where('category').equals(item.id).toArray() || [];
                const done = all.filter((item)=>{
                    return item.done
                }).length

                categories[index] = {...item, done, all: all.length}
            })
            return categories;
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


    static async addUser(name) {
        try {
            const user = {id: 1, name };
            const userId = await db.User.put(user);
            console.log('Tag added with ID:', userId);
        } catch (error) {
            console.error('Error adding User:', error);
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

    await Todo.addCategory('Personal');
    await Todo.addCategory('Work');
    await Todo.addUser('john');

    // Add Todo
    await Todo.addTodo('Task 1', 1);
    await Todo.addTodo('Task 2', 2);
    await Todo.addTodo('Task 3', 1);

    // Get all Todo
    await Todo.getAllTodo();

    // Get Todo by category
    await Todo.getCategory(1);

    // Get all categories
    await Todo.getAllCategories();

})();
