<script>
    import Mobile from "./mobile.svelte";
    import Category from "./category.svelte";
    import Hello from "./hello.svelte";
    import TodoItem from "./todo.svelte";
    import {Todo} from "../todo";
    import { onMount } from "svelte";

    let todos =  [];


    onMount(async()=>{
        todos = await Todo.getAllTodo(); 
    })

    function handleTodoChange(event) {
        const { todo } = event.detail;

        // Update the todo item in the todos array
        todos = todos.map((t) => (t.title === todo.title ? todo : t));

        // Do something else with the updated todo item
        console.log(todo);
    }
</script>

<Hello />
<Category />
<div class="flex flex-col items-center text-center space-y-4">
    {#each todos as todo}
        <TodoItem {todo} on:todoChange={handleTodoChange} />
    {/each}
</div>

<Mobile />

<style>
    /* your styles go here */
</style>
