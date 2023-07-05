<script>
    import { Router, Route } from "svelte-routing";
    import Signup from "./Components/signup.svelte";
    import CalenderPage from "./Components/calenderPage.svelte";
    import TodoPage from "./Components/todoPage.svelte";
    import Mobile from "./Components/mobile.svelte";
    import CategoryPage from "./Components/categoryPage.svelte";
    import Input from "./Components/input.svelte";
    import ModalBottom from "./Components/modalBottom.svelte";
    import Hello from "./Components/hello.svelte";
    import Settings from "./Components/settings.svelte";

    export let title;
    let isOpen = true;
    let info = {};
</script>

<Router>
    <Route path="/" component={TodoPage} />
    <Route path="/post" component={Input} />
    <Route path="/date" component={CalenderPage}/>
</Router>

<!-- <CalenderPage/> -->
<!-- <Settings/> -->
<!-- <ModalBottom {isOpen} {info}>
    <div class="container">
        <button class="w-3/4 m-4 p-3 text-white bg-primary rounded-lg">
            Logout
        </button>
        <button class="w-3/4 m-4 p-3 text-white bg-tertiary rounded-lg">
            Cancel
        </button>
    </div>
</ModalBottom> -->

<style>
</style>
