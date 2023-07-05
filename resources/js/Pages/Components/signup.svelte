<script>
    import { createEventDispatcher } from 'svelte';
    
    let email = '';
    let password = '';
    let confirmPassword = '';
    
    const dispatch = createEventDispatcher();
    
    function handleSubmit(event) {
      event.preventDefault();
      
      // Validate the email and password fields
      if (!email || !password || !confirmPassword) {
        alert('Please fill in all the fields');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      // Do something to sign up the user with email and password
      // ...
      
      // Dispatch an event to notify the app
      dispatch('signup', { email, password });
    }
    
    function handleGoogleSignup() {
      // Do something to sign up the user with Google
      // ...
      
      // Dispatch an event to notify the app
      dispatch('googleSignup');
    }
    
    function handleGuestLogin() {
      // Do something to log in the user as a guest
      // ...
      
      // Dispatch an event to notify the app
      dispatch('guestLogin');
    }
    
    function handleLogin() {
      // Navigate to the login page or route
      // ...
    }
  </script>
  
  <style>
    /* Use tailwind classes to style the page */
    .container {
      @apply h-screen w-screen flex flex-col items-center justify-center bg-gray-100;
    }
    
    .form {
      @apply bg-white shadow-lg rounded-lg p-8 max-w-md;
    }
    
    .input {
      @apply border-2 border-gray-200 rounded-lg px-4 py-2 w-full mb-4 outline-none;
    }
    
    .input:focus {
      @apply border-gray-400;
    }
    
    .button {
      @apply text-white rounded-lg px-4 py-2 w-full mb-4 shadow-md;
    }
    
    .button:hover {

    }
    
    .google-button {
      @apply bg-red-500 text-white rounded-lg px-4 py-2 w-full mb-4 shadow-md flex items-center justify-center;
    }
    
    .google-button:hover {
      @apply bg-red-600;
    }
    
    .google-icon {
      @apply h-6 w-6 mr-2;
    }
    
    .guest-button {
      @apply text-white rounded-lg px-4 py-2 w-full mb-4 shadow-md;
    }
    
    .guest-button:hover {
      @apply bg-blue-200;
    }
    
    .login-link {
      @apply text-center text-gray-500 underline cursor-pointer;
    }
  </style>
  
  <div class="container">
    <!-- Form -->
    <form class="form" on:submit={handleSubmit}>
      <h1 class="text-3xl font-bold mb-8">Sign up</h1>
      
      <!-- Email input -->
      <input class="input" type="email" placeholder="Email" bind:value={email}>
      
      <!-- Password input -->
      <input class="input" type="password" placeholder="Password" bind:value={password}>
      
      <!-- Confirm password input -->
      <input class="input" type="password" placeholder="Confirm password" bind:value={confirmPassword}>
      
      <!-- Sign up button -->
      <button class="button bg-secondary" type="submit">Sign up</button>
      
      <!-- Sign up with Google button -->
      <button class="google-button" on:click={handleGoogleSignup}>
        <!-- <img class="google-icon" src="google-icon.png" alt="Google Icon"> -->
        Sign up with Google
      </button>
      
      <!-- Use without login button -->
      <button class="guest-button bg-light" on:click={handleGuestLogin}>Use without login</button>
      
      <!-- Or login option -->
      <p class="login-link" on:click={handleLogin}>Or login</p>
    </form>
  </div>
  