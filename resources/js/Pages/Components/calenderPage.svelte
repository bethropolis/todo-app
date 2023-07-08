<script>
    import TodoItem from "./todo.svelte";
    import Calender from "./calender.svelte";
    import Mobile from "./mobile.svelte";
    import { onMount } from "svelte";
    import { Todo } from "../todo";
    let todos = [];

    onMount(async () => {
        let d = new Date();
        todos = await Todo.getByDay(
            new Date(d.getTime() - 24 * 60 * 60 * 1000)
        );
    });

    function handleTodoChange(event) {
        const { todo } = event.detail;

        // Update the todo item in the todos array
        todos = todos.map((t) => (t.id === todo.id ? todo : t));
    }

    function handleTodoDelete(event) {
        const { todo } = event.detail;

        todos = todos.filter((t) => t.id !== todo.id);
    }
    async function handleDate(event) {
        const { date } = event.detail;
        todos = await Todo.getByDay(date);
    }
</script>

<Calender on:daySelect={handleDate} />

<div class="flex flex-col items-center text-center space-y-4">
    {#if todos.length}
        {#each todos as todo}
            <TodoItem
                {todo}
                on:todoChange={handleTodoChange}
                on:todoDelete={handleTodoDelete}
            />
        {/each}
    {/if}
</div>
<Mobile activeButton="date" />

<style>
    /* your styles go here */
</style>
