import { db } from "./db";





// Define the logic for your todo app
export class Todo {

    static async handleError(error, action) {
        console.error(`Error in ${action}:`, error);
        throw error;
    }

    static async addSync(type, itemId) {
        try {
            const date = new Date();
            const sync = { type, itemId, time: date };
            const syncId = await db.Sync.add(sync);
            localStorage.setItem('syncId', syncId);
            console.log(`Sync added type:${type} with ID:`, syncId);
            return syncId;
        } catch (error) {
            await this.handleError(error, 'addSync');
        }
    }

    static async addTodo(todoData) {
        try {
            const todo = {
                title: todoData.title,
                category: parseInt(todoData.category),
                labels: todoData.labels,
                date: new Date(),
                done: false,
                deleted: false,
            };
            const todoId = await db.Todo.add(todo);

            // Add sync for adding a new todo
            await this.addSync('addTodo', todoId);

            console.log('Todo added successfully');
            return todoId;
        } catch (error) {
            await this.handleError(error, 'addTodo');
        }
    }

    static async getAllTodo() {
        try {
            const todos = await db.Todo.toArray();

            const formattedTodos = await Promise.all(
                todos.map(async (todo) => {
                    try {
                        const associatedCategory = await db.Categories.get(todo.category);
                        if (!associatedCategory) {
                            throw new Error(`Category with ID ${todo.category} not found`);
                        }
                        return {
                            title: todo.title,
                            category: {
                                name: associatedCategory.name,
                                color: associatedCategory.color,
                                id: associatedCategory.id,
                            },
                            labels: todo.labels,
                            date: todo.date,
                            done: todo.done,
                            delete: todo.deleted,
                            id: todo.id,
                        };
                    } catch (error) {
                        await this.handleError(error, 'getAllTodo');
                    }
                })
            );

            return formattedTodos;
        } catch (error) {
            await this.handleError(error, 'getAllTodo');
        }
    }

    static async getTodoByCategory(category) {
        try {
            const todos = await db.Todo.where('category').equals(category).toArray();

            const formattedTodos = await Promise.all(
                todos.map(async (todo) => {
                    try {
                        const associatedCategory = await db.Categories.get(todo.category);
                        if (!associatedCategory) {
                            throw new Error(`Category with ID ${todo.category} not found`);
                        }
                        return {
                            title: todo.title,
                            category: {
                                name: associatedCategory.name,
                                color: associatedCategory.color,
                                id: associatedCategory.id,
                            },
                            labels: todo.labels,
                            date: todo.date,
                            done: todo.done,
                            delete: todo.deleted,
                            id: todo.id,
                        };
                    } catch (error) {
                        await this.handleError(error, 'getTodoByCategory');
                    }
                })
            );
            return formattedTodos;
        } catch (error) {
            await this.handleError(error, 'getTodoByCategory');
        }
    }

    static async addCategory(name, categoryId) {
        try {
            const color = this.generateRandomColor();
            const category = { name, color, category: categoryId };
            const c_id = await db.Categories.add(category);
            console.log('Category added successfully');
            await this.addSync('addCategory', c_id);
        } catch (error) {
            await this.handleError(error, 'addCategory');
        }
    }

    static generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static async getCategory(categoryId) {
        try {
            const category = await db.Categories.get(categoryId);
            if (!category) {
                throw new Error(`Category with ID ${categoryId} not found`);
            }
            return category;
        } catch (error) {
            await this.handleError(error, 'getCategory');
        }
    }

    static async updateCategory(categoryId, updatedCategory) {
        try {
            const category = await db.Categories.get(categoryId);
            if (!category) {
                throw new Error(`Category with ID ${categoryId} not found`);
            }
            const updated = { ...category, ...updatedCategory };
            await db.Categories.put(updated);
            await this.addSync('updateCategory', categoryId);
            console.log(`Category with ID ${categoryId} updated successfully`);
        } catch (error) {
            await this.handleError(error, 'updateCategory');
        }
    }

    static async deleteCategory(categoryId) {
        try {
            const category = await db.Categories.get(categoryId);
            if (!category) {
                throw new Error(`Category with ID ${categoryId} not found`);
            }
            await db.Categories.delete(categoryId);
            await this.addSync('deleteCategory', categoryId);
            console.log(`Category with ID ${categoryId} deleted successfully`);
        } catch (error) {
            await this.handleError(error, 'deleteCategory');
        }
    }

    static async getAllCategories() {
        try {
            const categories = await db.Categories.toArray();
            const promises = categories.map(async (item, index) => {
                try {
                    const all = await db.Todo.where('category').equals(item.id).toArray() || [];
                    const done = all.filter((item) => {
                        return item.done;
                    }).length;
                    return { ...item, done, all: all.length };
                } catch (error) {
                    await this.handleError(error, 'getAllCategories');
                }
            });
            const formattedCategories = await Promise.all(promises);
            return formattedCategories;
        } catch (error) {
            await this.handleError(error, 'getAllCategories');
        }
    }

    static async markAsDone(todoId) {
        try {
            const todo = await db.Todo.get(todoId);
            if (!todo) {
                throw new Error(`Todo with ID ${todoId} not found`);
            }
            todo.done = !todo.done;
            await db.Todo.put(todo);
            await this.addSync('markAsDone', todoId);
            console.log(`Todo with ID ${todoId} marked as done`);
        } catch (error) {
            await this.handleError(error, 'markAsDone');
        }
    }

    static async getByDay(date) {
        try {
            const targetDate = new Date(date);
            const startDate = new Date(targetDate.getTime() + 24 * 60 * 60 * 1000); // Subtract 24 hours

            const todos = await db.Todo
                .where('date')
                .between( targetDate,startDate, true, true) // Range includes startDate and targetDate
                .toArray();
                

            const formattedTodos = todos.map((todo) => ({
                title: todo.title,
                category: {
                    name: todo.category.name,
                    color: todo.category.color,
                    id: todo.category.id,
                },
                labels: todo.labels,
                date: todo.date,
                done: todo.done,
                delete: todo.deleted,
                id: todo.id,
            }));

            await this.addSync('getByDay', date);
            return formattedTodos;
        } catch (error) {
            await this.handleError(error, 'getByDay');
        }
    }


    static async addTag(name) {
        try {
            const tag = { name };
            const tagId = await db.Tags.add(tag);
            console.log('Tag added with ID:', tagId);
        } catch (error) {
            await this.handleError(error, 'addTag');
        }
    }

    static async addUser(name) {
        try {
            const user = { id: 1, name };
            const userId = await db.User.put(user);
            console.log('Tag added with ID:', userId);
        } catch (error) {
            await this.handleError(error, 'addUser');
        }
    }

    static async getAllTags() {
        try {
            const tags = await db.Tags.toArray();
            console.log('All Tags:', tags);
        } catch (error) {
            await this.handleError(error, 'getAllTags');
        }
    }

    static async deleteTodo(todoId) {
        try {
            const todo = await db.Todo.get(todoId);
            if (!todo) {
                throw new Error(`Todo with ID ${todoId} not found`);
            }
            await db.Todo.delete(todoId);
            await this.addSync('deleteTodo', todoId);
            console.log(`Todo with ID ${todoId} deleted successfully`);
        } catch (error) {
            await this.handleError(error, 'deleteTodo');
        }
    }
}


// Example usage
// (async () => {

//     await Todo.addCategory('Personal');
//     await Todo.addCategory('Work');
//     await Todo.addUser('john');

//     // Add Todo
//     await Todo.addTodo('Task 1', 1);
//     await Todo.addTodo('Task 2', 2);
//     await Todo.addTodo('Task 3', 1);

//     // Get all Todo
//     await Todo.getAllTodo();

//     // Get Todo by category
//     console.log(await Todo.getTodoByCategory(1));

//     // Get all categories
//     await Todo.getAllCategories();

// })();