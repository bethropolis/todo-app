<script>
    // your script goes here

    import Category from "./category.svelte";

    export let todos = [];
    function handleCategorySelect(event) {
        const { category } = event.detail;

        // Filter the todo items by the selected category
        todos = todos.filter(
            (todo) =>
                todo.labels.includes(category.name) || category.name === "All"
        );

        // Do something else with the selected category
        console.log(category);
    }
</script>

<Category on:categorySelect={handleCategorySelect} />

<style>
    /* your styles go here */
</style>
