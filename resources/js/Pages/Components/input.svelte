<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { nav } from '../route';
    import { Todo } from '../todo';
  
    let input = '';
    let labels = [];

    onMount(async () => {
      labels = await Todo.getAllCategories();
    });
  
    let selectedCategory = 1;
    const dispatch = createEventDispatcher();
  
    function handleInput(event) {
      input = event.target.value;
    }
  
    function addTodo() {
      if (input.trim()) {
        // Create a new todo item with the input and the selected labels
        const todo = {
          title: input,
          date: new Date().toISOString().slice(0, 10),
          category: selectedCategory,
          labels: "",
        };

        Todo.addTodo(todo);
        input = '';
        selectedCategory = '';
        // Dispatch an event with the new todo item
        dispatch('todoAdd', { todo });
        nav('');
      }
    }
  
    function handleSelect(event) {
      selectedCategory = event.target.value;
    }
  </script>
  
  <div class="container">
    <!-- Input -->
    <input class="input" type="text" placeholder="Enter your todo here" bind:value={input} on:input={handleInput} />
  
    <!-- Select -->
    <div class="select-container flex  space-x-2">
      <label for="select" class="align-items-center">Label:</label>
      <select class="select" id="select" on:change={handleSelect}>
        {#each labels as label}
          <option value={label.id} selected={label.id === selectedCategory}>{label.name} </option>
        {/each}
      </select>
    </div>
  
    <!-- Button -->
    <button class="button" on:click={addTodo}>
      <!-- Plus icon -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </button>
  </div>
  
  <style>
    /* Use tailwind classes to style the page */
    .container {
      @apply h-screen w-screen flex flex-col items-center justify-center bg-gray-100;
    }
  
    .input {
      @apply text-xl font-bold w-3/4 text-center outline-none bg-none rounded-lg p-4 m-4 bg-transparent;
    }
  
    .select-container {
      @apply relative w-48 mt-4 justify-center items-center;
    }
  
    .selected-labels {
      @apply flex flex-wrap mt-1;
    }
  
    .selected-label {
      @apply rounded-full px-2 py-1 m-1 text-white;
    }
  
    .select {
      @apply appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight  w-full;
    }
  
    .button {
      @apply fixed bottom-4 right-0 bg-green-500 text-white rounded-full p-4 m-4 shadow-lg;
    }
  
    .button:hover {
      @apply bg-green-600;
    }
  </style>
  