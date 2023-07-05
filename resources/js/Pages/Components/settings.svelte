<script>
    import { createEventDispatcher } from "svelte";
    import Hello from "./hello.svelte";

    export let darkMode = false;

    const dispatch = createEventDispatcher();

    function toggleDarkMode() {
        darkMode = !darkMode;
        dispatch("darkModeChange", { darkMode });
    }

    function logout() {
        // Do something to log out the user
        // ...

        // Dispatch an event to notify the app
        dispatch("logout");
    }

    function deleteAccount() {
        // Do something to delete the user account
        // ...

        // Dispatch an event to notify the app
        dispatch("deleteAccount");
    }
</script>
   <Hello/>

<div class="container">
    <div class="option">
        <div class="label">Dark mode</div>
        <div class="toggle">
            <input type="checkbox" id="check" checked={darkMode} on:change={toggleDarkMode}>
            <label class="slider" for="check"></label>
          </div>
    </div>

    <!-- Logout option -->
    <div class="option">
        <div class="label">Logout</div>
        <button class="button" on:click={logout}>Logout</button>
    </div>

    <!-- Delete account option -->
    <div class="option">
        <div class="label">Delete account</div>
        <button class="button" on:click={deleteAccount}>Delete</button>
    </div>
</div>

<style>
    /* Use tailwind classes to style the component */
    .container {
        @apply bg-white shadow-lg rounded-lg p-4 max-w-md;
    }

    .option {
        @apply flex items-center justify-between border-b-2 border-gray-200 py-2;
    }

    .label {
        @apply text-lg font-medium;
    }

    .toggle {
        @apply relative inline-block w-10 h-6 align-middle select-none;
    }

    .toggle input {
        @apply absolute opacity-0 w-0 h-0;
    }

    .slider {
    @apply absolute top-0 left-0 right-0 bottom-0 cursor-pointer bg-gray-400 rounded-full transition-all duration-300;
  }
  
  .slider:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}
  
  .toggle input:checked + .slider {
    @apply bg-green-400;
  }
  
  .toggle input:checked + .slider:before {
    @apply transform translate-x-4;
  }
    .button {
        @apply text-red-500 font-bold;
    }
</style>
