<template>
    <div class="wrapper">
        <div class="header">
            <span v-if="drawing">{{lastWord}}</span>
            <span v-else>What is this?</span>

            <button @click="done" v-if="drawing">Done</button>
            <button @click="guess" v-else>Guess</button>
        </div>
        <Draw ref="drawing" :editable="drawing" :segments.sync="current"/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import Draw from "../components/Draw";

    export default {
        components: {Draw},
        data() {
            return {drawing: true, current: []}
        },
        computed: {
            ...mapGetters(['lastWord', 'isFinished']),
        },
        methods: {
            ...mapActions(['addWord', 'addImage', 'nextStage', 'result']),
            done() {
                let segs = this.$refs.drawing.getSegments()
                if (segs.length === 0) {
                    alert("You didn't draw anything :(")
                    return
                }

                this.nextStage()
                this.addImage(this.$refs.drawing.getImage())

                if (this.isFinished)
                    this.result()
                else
                    this.drawing = false
            },
            guess() {
                let answer = prompt("What's your guess?")
                if (!answer)
                    return
                this.$refs.drawing.clear()
                this.addWord(answer)
                this.nextStage()

                if (this.isFinished)
                    this.result()
                else
                    this.drawing = true
            }
        }
    }
</script>

<style lang='scss' scoped>
    .wrapper {
        height: 100%;
        display: grid;

        grid-template-rows: auto 1fr;
    }

    .header button {
        position: absolute;
        height: 30px;
        margin: 10px;
        font-size: 1em;
        right: 0;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
</style>