<script>
    import { createEventDispatcher } from "svelte";
    import { Todo } from "../todo";

    export let todo = {
        id: "",
        title: "",
        date: "",
        category: "",
        labels: [],
        done: false,
        delete: false,
    };

    let expanded = false;
    const dispatch = createEventDispatcher();

    function toggleDone() {
        todo.done = !todo.done;
        Todo.markAsDone(todo.id);
        dispatch("todoChange", { todo });
    }

    function toggleExpand() {
        expanded = !expanded;
    }

    function deleteTodo() {
        todo.delete = !todo.delete;
        Todo.deleteTodo(todo.id);
        setTimeout(() => {
            dispatch("todoDelete", { todo });
        }, 1000); // Simulate some delay
    }

    function getTime(time) {
        let dt = new Date(time);
        let t = `${dt.getHours()}:${dt.getMinutes()}`;
        return t;
    }

    function getDate(time) {
        let dt = new Date(time);
        let d = `${dt.getDay()}/${dt.getMonth()}/${dt.getFullYear()}`;
        return d;
    }
</script>

<div class="container" class:deleting={todo.delete} role="detail" on:click={toggleExpand}>
    <div class="flex items-center">
        <div
            class="checkbox"
            class:done={todo.done}
            on:click|stopPropagation={toggleDone}
        >
            <!-- Check icon -->
            {#if todo.done}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-4 w-4 text-white"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            {/if}
        </div>
        <span class="title" class:done={todo.done}>{todo.title}</span>

        <!-- Delete icon button -->
        <button class="delete-button" on:click|stopPropagation={deleteTodo}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-4 w-4"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    </div>

    {#if expanded}
        <div class="details">
            <p>Date: {getDate(todo.date)}</p>
            <p>
                Labels:<span
                    class="label"
                    style="background-color: {todo.category.color};"
                    >{todo.category.name}</span
                >
                {#each todo.labels as label}<span class="label">{label}</span
                    >{/each}
            </p>
            <p>Time: {getTime(todo.date)}</p>
        </div>
    {/if}
</div>

<style>
    /* Use tailwind classes to style the layout */
    .container {
        @apply bg-white shadow-lg rounded-lg p-4 max-w-xl cursor-pointer relative transition-all duration-300;
    }

    .container.deleting {
        @apply opacity-50 pointer-events-none;
    }

    .checkbox {
        @apply border-2 border-gray-400 rounded-full h-6 w-6 flex items-center justify-center mr-4;
    }

    .checkbox.done {
        @apply border-green-400 bg-green-400;
    }

    .title {
        @apply text-lg font-bold truncate;
    }
    .title.done {
        /* text strike trough */
        text-decoration: line-through;
        text-decoration-thickness: 2px;
    }

    .details {
        @apply text-sm text-left text-gray-500  mt-2;
    }

    .label {
        @apply inline-block bg-gray-200 rounded-full px-2 py-1 mr-2 text-xs;
    }

    .delete-button {
        @apply absolute top-0 right-0 bg-red-500 text-white rounded-bl-lg p-2 hidden;
    }

    .delete-button:hover {
        @apply bg-red-600;
    }

    .container:hover .delete-button {
        @apply block;
    }
</style>
