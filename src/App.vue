<template>
    <div id="app">
        <Start v-if="isStart"></Start>
        <Game v-else-if="isGame"></Game>
        <Result v-else-if="isResult"></Result>
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
            window.onbeforeunload = function() {
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

    #app {
        height: 100%;
        min-height: 100%;
    }

    button {
        border:none;
        &:active, &:focus {
            outline: none;
        }
    }

    .header {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ddd;
        box-shadow: 0 1px 3px rgba(100, 100, 100, 0.3);
        position: relative;
        text-align: center;
        background: #eee;
    }
</style>
