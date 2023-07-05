<script>
    import { createEventDispatcher } from "svelte";

    export let date = new Date(); // The current date
    export let events = []; // An array of events with date and title properties

    const dispatch = createEventDispatcher();

    // Get the first day of the month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    // Get the last day of the month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Get the number of days in the month
    const daysInMonth = lastDay.getDate();

    // Get the number of blank cells before the first day
    const blankCellsBefore = firstDay.getDay();

    // Get the number of blank cells after the last day
    const blankCellsAfter = 6 - lastDay.getDay();

    // Get the total number of cells in the calendar
    const totalCells = daysInMonth + blankCellsBefore + blankCellsAfter;

    // Get the number of rows in the calendar
    const rows = totalCells / 7;

    // Get the month name
    const monthName = date.toLocaleString("default", { month: "long" });

    // Get the year
    const year = date.getFullYear();

    // Get the previous month
    function prevMonth() {
        date = new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            date.getDate()
        );
        dispatch("monthChange", { date });
    }

    // Get the next month
    function nextMonth() {
        date = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        );
        dispatch("monthChange", { date });
    }

    // Select a day
    function selectDay(day) {
        date = new Date(date.getFullYear(), date.getMonth(), day);
        dispatch("daySelect", { date });
    }
</script>

<div class="container">
    <div class="header">
        <button class="nav-button" on:click={prevMonth}>
            <!-- Left arrow icon -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
        </button>

        <div class="month">{monthName} {year}</div>

        <button class="nav-button" on:click={nextMonth}>
            <!-- Right arrow icon -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </button>
    </div>

    <div class="days">
        <!-- Render the day names -->
        {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as dayName}
            <div class="day-name">{dayName}</div>
        {/each}

        <!-- Render the calendar cells -->
        {#each Array(totalCells) as _, i}
            {#if i < blankCellsBefore || i >= daysInMonth + blankCellsBefore}
                <!-- Render blank cells before the first day and after the last day -->
                <div class="day blank" />
            {:else}
                <!-- Render the actual calendar days -->
                {#if date.getDate() === i - blankCellsBefore + 1 && date.getMonth() === date.getMonth()}
                    <!-- Highlight the current day -->
                    <div
                        class="day current"
                        on:click={() => selectDay(i - blankCellsBefore + 1)}
                    >
                        {i - blankCellsBefore + 1}
                    </div>
                {:else if events.find((event) => event.date === i - blankCellsBefore + 1 && date.getMonth() === date.getMonth())}
                    <!-- Mark the days with events -->
                    <div
                        class="day event"
                        on:click={() => selectDay(i - blankCellsBefore + 1)}
                    >
                        {i - blankCellsBefore + 1}
                    </div>
                {:else}
                    <div
                        class="day"
                        on:click={() => selectDay(i - blankCellsBefore + 1)}
                    >
                        {i - blankCellsBefore + 1}
                    </div>
                {/if}
            {/if}
        {/each}
    </div>
</div>

<style>
    /* Use tailwind classes to style the component */
    .container {
        @apply bg-white shadow-lg rounded-lg p-4 max-w-lg;
    }

    .header {
        @apply flex items-center justify-between mb-4;
    }

    .month {
        @apply text-lg font-bold;
    }

    .nav-button {
        @apply text-gray-600 p-2 rounded-full cursor-pointer;
    }

    .days {
        @apply grid grid-cols-7 gap-1;
    }

    .day-name {
        @apply text-sm text-gray-500 uppercase text-center;
    }

    .day {
        @apply h-7 w-7 flex items-center justify-center rounded-full cursor-pointer;
        color: #374151;
        background-color: #f9fafb;
        border: solid #e5e7eb;
        border-width: thin;

        /* Use a custom class to style the current day */
        &.current {
            color: white;
            background-color: #60a5fa;
            border-color: #60a5fa;
        }

        /* Use a custom class to style the selected day */
        &.selected {
            color: white;
            background-color: #2563eb;
            border-color: #2563eb;
        }

        /* Use a custom class to style the days with events */
        &.event::after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: -2px;
            right: -2px;
            height: 4px;
            border-radius: inherit;
            background-color: #34d399; /* Use a different color for each event type */
        }

        /* Use a custom class to hide the blank cells */
        &.blank {
            visibility: hidden;
        }

        /* Use a custom class to disable the days outside the current month */
        &.disabled {
            pointer-events: none;
            opacity: 0.5;
        }

        /* Use a custom class to add some space between the cells */
        & + & {
            margin-left: 0.25rem;
        }

        /* Use a custom class to center the cells in each row */
        &:first-child:nth-last-child(7),
        &:first-child:nth-last-child(6) ~ &:nth-last-child(6),
        &:first-child:nth-last-child(5) ~ &:nth-last-child(5),
        &:first-child:nth-last-child(4) ~ &:nth-last-child(4),
        &:first-child:nth-last-child(3) ~ &:nth-last-child(3),
        &:first-child:nth-last-child(2) ~ &:nth-last-child(2),
        &:first-child:nth-last-child(1) ~ &:nth-last-child(1) {
            margin-left: auto;
        }
    }
</style>
