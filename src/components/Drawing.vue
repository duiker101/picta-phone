<template>
    <canvas ref="canvas"/>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        props: {segments: Array},
        components: {},
        methods: {
            ...mapActions([]),
            redraw() {
                let context = this.$refs.canvas.getContext('2d');
                context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
                context.lineJoin = "round";
                context.lineCap = "round";

                this.segments.forEach(s => {
                    context.beginPath();
                    if (s.tool === 0) {
                        context.strokeStyle = "#fff";
                        context.lineWidth = 20;
                    } else {
                        context.strokeStyle = "#000";
                        context.lineWidth = 5;
                    }
                    // move to the beginning of the segment
                    if (s.lines.length > 0) {
                        let {x, y} = s.lines[0]
                        context.moveTo(x, y);
                    }
                    // draw the segment
                    s.lines.forEach(({x, y}, i) => {
                        context.lineTo(x, y);
                    });
                    context.stroke();
                })
            }

        },
        computed: {
            ...mapGetters([]),
        },
        mounted() {
            this.redraw()
        }

    }
</script>

<style lang='scss' scoped>

</style>