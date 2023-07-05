<script>
    import { createEventDispatcher } from "svelte";
    import { nav } from "../route";
    export let activeButton = "post"; // Set the initial active button
    const dispatch = createEventDispatcher();

    function handleClick(button) {
        activeButton = button;
        dispatch("buttonClick", { button });
    }

    function toPost() {
        handleClick("post");
        nav("post");
    }

    function toDate() {
        activeButton === "date" ? nav("") : nav("date");
        handleClick("date");
    }
</script>

<nav
    class="fixed bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2"
>
    <button
        class="button"
        class:selected={activeButton === "date"}
        on:click={() => toDate()}
    >
        {#if activeButton !== "date"}
            <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8 2V5"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M16 2V5"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M3.5 9.08997H20.5"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M15.6947 13.7H15.7037"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M15.6947 16.7H15.7037"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M11.9955 13.7H12.0045"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M11.9955 16.7H12.0045"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M8.29431 13.7H8.30329"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M8.29431 16.7H8.30329"
                    stroke="#292D32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        {:else}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="icon"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        {/if}
    </button>

    <button
        class="button"
        class:selected={activeButton === "post"}
        on:click={() => toPost()}
    >
        <!-- Add icon button -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="icon"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
        </svg>
    </button>
</nav>

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
