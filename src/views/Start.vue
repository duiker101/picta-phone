<template>
    <div class="wrapper">
        <div class="header">Tell-e-phone</div>

        <div class="players">
            Number of pass
            <h3>{{$store.state.playerCount}}</h3>
            <div class="controls">
                <button @click="$store.state.playerCount++"><img src="@/assets/plus.svg"/></button>
                <button @click="()=>{if($store.state.playerCount>2)$store.state.playerCount--}"><img
                        src="@/assets/minus.svg"/></button>
            </div>
        </div>
        <div class="start">
            <button @click="start">Start</button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        components: {},
        computed: {
            ...mapGetters([]),
        },
        methods: {
            ...mapActions(['addWord', 'game']),
            start() {
                let word = prompt('Choose a starting word')
                if (!!word) {
                    this.addWord(word)
                    this.game()
                }
            }
        }

    }
</script>

<style lang='scss' scoped>
    .wrapper {
        height: 100%;
        display: grid;
        grid-template-rows: auto 2fr 1fr;
    }

    .players {
        align-self: center;
        text-align: center;
        font-size: 1.4rem;

        .controls {

            button {
                border-radius: 50%;
                width: 50px;
                height: 50px;
                background: #ddd;
                margin: 1em;

                &:active {
                    background: #aaa;
                }
            }
        }
    }

    .start {
        align-self: center;
        text-align: center;

        button {
            border-radius: 10px;
            background: #42b983;
            text-align: center;
            width: 150px;
            height: 70px;
            line-height: 60px;
            font-size: 2rem;
        }
    }
</style>