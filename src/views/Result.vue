<template>
    <div class="wrapper">
        <div class="header">Result
            <div class="buttons">
                <button @click="start">Play Again</button>
                <button @click="save">save</button>
            </div>
        </div>
        <div ref="results">
            <div class="result" v-for="(r,i) in result">
                <span v-if="i%2===0">{{r}}</span>
                <img v-else :src="r"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import Drawing from "../components/Drawing";
    import html2canvas from "html2canvas";

    export default {
        props: {},
        components: {Drawing},
        data() {
            return {}
        },
        methods: {
            ...mapActions(['start']),
            save() {
                html2canvas(this.$refs.results).then((a, b) => {
                    console.log(a, b)
                    let link = document.createElement('a');
                    link.download = 'masterpiece_' + new Date().getTime() + '.png';
                    link.href = a.toDataURL('image/png')
                    link.click();
                })

            }
        },
        computed: {
            ...mapGetters(['result']),
        },

    }
</script>

<style lang='scss' scoped>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        .buttons {
            button {
                background: #42b983;
                color: white;
                padding: .8em;
                font-size: .8em;
                border-radius: 2px;
                margin: .5em;
            }

            position: absolute;
            right: 0;
            top: 0;
        }
    }

    .wrapper {
        padding-top: 50px;
    }

    .result {
        text-align: center;
        margin: 1em;

        span {
            font-size: 1.5em;
            font-weight: 700;
        }
    }
</style>