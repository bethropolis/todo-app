<script>
    import { createEventDispatcher } from 'svelte';
    
    export let categories = [
      {
        name: 'All',
        color: '#f0efebff',
        done: 5,
        all: 10
      },
      {
        name: 'Work',
        color: '#f28482ff',
        done: 3,
        all: 6
      },
      {
        name: 'Personal',
        color: '#84a59dff',
        done: 1,
        all: 2
      },
      {
        name: 'Shopping',
        color: '#f6bd60ff',
        done: 2,
        all: 4
      },
      {
        name: 'Urgent',
        color: '#cdb4dbff',
        done: 2,
        all: 4
      }
    ];
    
    let activeCategory = categories[0];
    const dispatch = createEventDispatcher();
    
    function selectCategory(category) {
      activeCategory = category;
      dispatch('categorySelect', { category });
    }
  </script>
  
  <style>
    /* Use tailwind classes to style the layout */
    .container {
      @apply flex overflow-x-auto py-2;
    }
    
    .category {
      @apply flex flex-col items-center justify-center bg-white rounded-lg p-4 m-2 shadow-md;
    }
    
    .category.active {
      @apply shadow-lg;
    }
    
    .name {
      @apply text-sm font-medium;
    }
    
    .progress {
      @apply h-1 w-full rounded-full mt-2;
      background-color: #e5e7eb;
    }
    
    .progress-bar {
      @apply h-full rounded-full;
    }
    
    /* Hide the scrollbar */
    .container::-webkit-scrollbar {
      display: none;
    }
  </style>
  
  <div class="container">
    {#each categories as category}
      <div class="category" class:active={activeCategory === category} on:click={() => selectCategory(category)}>
        
        <!-- Name -->
        <div class="name">{category.name}</div>
        
        <!-- Progress -->
        <div class="progress">
          <div class="progress-bar" style={`width: ${category.done / category.all * 100}%; background-color: ${category.color}`}></div>
        </div>
        
      </div>
    {/each}
  </div>
  