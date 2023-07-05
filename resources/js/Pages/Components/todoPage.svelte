<script>
    import Mobile from "./mobile.svelte";
    import Category from "./category.svelte";
    import Hello from "./hello.svelte";
    import Todo from "./todo.svelte";

    let todos = [
        {
            title: "Buy groceries",
            date: "2023-07-05",
            labels: ["shopping", "urgent"],
            time: "10:00 AM",
            done: false,
        },
        {
            title: "Finish project",
            date: "2023-07-06",
            labels: ["work", "deadline"],
            time: "5:00 PM",
            done: true,
        },
    ];

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
        <Todo {todo} on:todoChange={handleTodoChange} />
    {/each}
</div>

<Mobile />

<style>
    /* your styles go here */
</style>
