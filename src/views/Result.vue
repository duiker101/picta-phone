<template>
    <div>
        <div class="header">Result
            <button @click="start">Play Again</button>
        </div>
        <div v-for="r in result">
            <div v-if="typeof(r) === 'string'">{{r}}</div>
            <Drawing v-else :segments="r"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import Drawing from "../components/Drawing";

    export default {
        props: {},
        components: {Drawing},
        data() {
            return {}
        },
        methods: {
            ...mapActions(['start']),
        },
        computed: {
            ...mapGetters(['result']),
        },

    }
</script>

<style lang='scss' scoped>
</style>