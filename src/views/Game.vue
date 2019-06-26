<template>
    <div class="wrapper">
        <NavBar>
            <span v-if="drawing">{{lastWord}}</span>
            <span v-else>What is this?</span>

            <template slot="after">
                <el-button type="primary" @click="done" v-if="drawing">Done</el-button>
                <el-button type="primary" @click="guess" v-else>Guess</el-button>
            </template>
        </NavBar>

        <Draw ref="drawing" :editable="drawing" :segments.sync="current"/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import Draw from "../components/Draw";
    import NavBar from "../components/NavBar";

    export default {
        components: {Draw, NavBar},
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
</style>