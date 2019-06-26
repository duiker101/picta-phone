<template>
    <div class="wrapper">
        <NavBar>PictoPhone</NavBar>
        <main>
            <div></div>
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
        </main>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import NavBar from "../components/NavBar";

    export default {
        components: {NavBar},
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
    main{
        display: grid;
        grid-template-rows: 1fr 5fr 4fr 3fr;
    }
    .players {
        align-self: center;
        text-align: center;
        font-size: 1.4rem;
    }

    .start {
        align-self: center;
        text-align: center;

        .el-button {
            width: 150px;
            height: 70px;
            font-size: 2rem;
        }
    }
</style>