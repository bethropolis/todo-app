<script>
    import { createEventDispatcher } from 'svelte';
  
    let activeButton = 'add'; // Set the initial active button
    const dispatch = createEventDispatcher();
  
    function handleClick(button) {
      activeButton = button;
      dispatch('buttonClick', { button });
    }
  </script>
  
  <style>
    /* Use tailwind classes to style the buttons */
    .button {
      @apply text-white rounded-lg p-2;
      background-color: var(--uranian-blue);
    }
    
    .button:hover {
      background-color: var(--fairy-tale);
    }
    
    .button.selected {
      background-color: var(--carnation-pink);
    }
    
    /* Use a custom class to set the icon size */
    .icon {
      height: 32px;
      width: 32px;
    }
  </style>
  
  <nav class="fixed bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2">
    <button class="button" class:selected={activeButton === 'remove'} on:click={() => handleClick('remove')}>
      <!-- Remove icon button -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  
    <button class="button" class:selected={activeButton === 'add'} on:click={() => handleClick('add')}>
      <!-- Add icon button -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
    </button>
  </nav>
