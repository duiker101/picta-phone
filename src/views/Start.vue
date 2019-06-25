<template>
    <div class="wrapper">
        <div class="header">PictoPhone</div>
        <div class="players">
            Number of passes
            <h3>{{$store.state.playerCount}}</h3>
            <div class="controls">
                <el-button @click.prevent="$store.state.playerCount++" circle>
                    <img src="@/assets/plus.svg"/>
                </el-button>
                <el-button @click.prevent="()=>{if($store.state.playerCount>2)$store.state.playerCount--}" circle>
                    <img src="@/assets/minus.svg"/>
                </el-button>
            </div>
        </div>
        <div class="start">
            <el-button type="success" @click.prevent="start">Start</el-button>
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
                this.$prompt('', 'Choose a starting word', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                }).then(({value, action}) => {
                        if (!!value && action === 'confirm') {
                            this.addWord(value)
                            this.game()
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
        grid-template-rows: auto 2fr 1fr;
    }

    .players {
        align-self: center;
        text-align: center;
        font-size: 1.4rem;

        .controls {

            button {
                /*border-radius: 50%;*/
                /*width: 50px;*/
                /*height: 50px;*/
                /*background: #ddd;*/
                /*margin: 1em;*/

                /*&:active {*/
                /*    background: #aaa;*/
                /*}*/
            }
        }
    }

    .start {
        align-self: center;
        text-align: center;

        .el-button {
            /*    border-radius: 10px;*/
            /*    background: #42b983;*/
            /*    color: white;*/
            /*    text-align: center;*/
            width: 150px;
            height: 70px;
            /*    line-height: 60px;*/
            font-size: 2rem;
        }
    }
</style>