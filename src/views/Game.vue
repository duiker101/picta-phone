<template>
    <div class="wrapper">
        <div class="header">
            <span v-if="drawing">{{lastWord}}</span>
            <span v-else>What is this?</span>

            <el-button type="primary" @click="done" v-if="drawing">Done</el-button>
            <el-button type="primary" @click="guess" v-else>Guess</el-button>
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
                    this.$message({message: "You have to draw something! :(", type: 'error'})
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
                this.$prompt('', "What's your guess?", {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                }).then(({value, action}) => {
                        if (!!value && action === 'confirm') {
                            this.$refs.drawing.clear()
                            this.addWord(value)
                            this.nextStage()

                            if (this.isFinished)
                                this.result()
                            else
                                this.drawing = true
                        }
                    }
                )
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
        /*height: 30px;*/
        margin: 10px;
        /*font-size: 1em;*/
        right: 0;
        /*border: 1px solid #ddd;*/
        /*border-radius: 4px;*/
    }
</style>