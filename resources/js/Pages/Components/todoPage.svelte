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
        todos = todos.map((t) => (t.id === todo.id ? todo : t));

    }

    function handleTodoDelete(event) {
        const { todo } = event.detail;

        todos = todos.filter((t) => t.id !== todo.id);
    }
</script>

<main>
<Hello />
<Category />
<div class="flex flex-col items-center text-center space-y-4">
    {#each todos as todo}
        <TodoItem {todo} on:todoChange={handleTodoChange} on:todoDelete={handleTodoDelete} />
    {/each}
</div>
</main>
<Mobile />

<style>
    main{
        margin-bottom: 6rem;
    }

</style>
