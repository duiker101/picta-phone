<template>
    <div id="app" class="app">
        <Start v-if="isStart"/>
        <Game v-else-if="isGame"/>
        <Result v-else-if="isResult"/>
    </div>
</template>

<script>
    import Start from "./views/Start";
    import {mapActions, mapGetters} from "vuex";
    import Game from "./views/Game";
    import Result from "./views/Result";

    export default {
        components: {Result, Game, Start},
        computed: {
            ...mapGetters(['isStart', 'isGame', 'isResult']),
        },
        created() {
            window.onbeforeunload = function () {
                return "Yo, are you sure? You'll lose all progress!";
            }
        }
    }
</script>

<style lang="scss">
    body, html {
        padding: 0;
        margin: 0;

        height: 100%;
        min-height: 100%;
        font-family: Helvetica, sans-serif;
    }

    button {
        &:active, &:focus {
            outline: none;
        }
    }

    main{
        height: 100%;
    }

    .app {
        min-height: 100%;
        height: 100%;
    }

    .wrapper {
        padding-top: 60px;
        min-height: calc(100% - 60px);
        height: calc(100% - 60px);
    }
</style>
