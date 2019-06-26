<template>
    <div class="wrapper">
        <NavBar>
            <template slot="before">
                <el-button type="primary" @click="save">Save</el-button>
            </template>
            Result
            <template slot="after">
                <el-button type="success" @click="start">Play Again</el-button>
            </template>
        </NavBar>
        <div class="results" ref="result">
            <template v-for="(r,i) in result">
                <span v-if="i%2===0">{{r}}</span>
                <img v-else :src="r"/>
            </template>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import html2canvas from "html2canvas";
    import NavBar from "../components/NavBar";

    export default {
        props: {},
        components: {NavBar},
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
    .results {
        text-align: center;

        span {
            font-size: 1.5em;
            font-weight: 700;
            text-transform: capitalize;
            margin: 2em 1em .5em;
            display: block;
        }

        img {
            border: 1px solid rgba(100, 100, 100, 0.2);
            border-radius: 10px;
            box-shadow: 1px 1px 3px rgba(100, 100, 100, 0.5);
        }
    }
</style>