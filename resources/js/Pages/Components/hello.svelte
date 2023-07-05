<script>
    export let name = "hello";
</script>

<h2 class="message">What's up, {name}?</h2>

<style>
    /* Use tailwind classes to style the message */
    .message {
      @apply text-3xl font-bold text-black  rounded-lg p-4 mx-auto  mt-2;
    }
</style>
