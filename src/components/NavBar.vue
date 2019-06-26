<template>
    <header>
        <div class="before">
            <slot name="before"/>
        </div>
        <div class="main">
            <slot/>
        </div>
        <div class="after">
            <slot name="after"/>
        </div>
    </header>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        props: {},
        components: {},
        data() {
            return {}
        },
        methods: {
            ...mapActions([]),
        },
        computed: {
            ...mapGetters([]),
        },

    }
</script>

<style lang='scss' scoped>
    header {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ddd;
        box-shadow: 0 1px 3px rgba(100, 100, 100, 0.3);
        position: fixed;
        text-align: center;
        background: #eee;
        top: 0;
        left: 0;
        right: 0;
        text-transform: capitalize;

        .before {
            position: absolute;
            margin: auto 10px;
            left: 0;
            top: 0;
        }

        .after {
            position: absolute;
            margin: auto 10px;
            right: 0;
            top: 0;
        }
    }
</style>