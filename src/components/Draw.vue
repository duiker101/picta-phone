<template>
    <div class="board" ref="board">
        <div class="tools" v-if="editable">
            <button @click="tool=1" :class="{active:tool===1}"><img src="@/assets/pencil.svg"/></button>
            <button @click="tool=0" :class="{active:tool===0}"><img src="@/assets/eraser.svg"/></button>
            <button @click="clear"><img src="@/assets/trash.svg"/></button>
        </div>
        <canvas ref="canvas"
                v-touch:start="startDrag"
                v-touch:end="endDrag"
                v-touch:moving="addMove"
                :height="height"
        />
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import eraser from '../assets/eraser.svg'
    import pencil from '../assets/pencil.svg'
    import trash from '../assets/trash.svg'

    export default {
        components: {},
        props: {editable: Boolean},
        data() {
            return {segments: [], dragging: false, tool: 1, height: 0}
        },
        actions: {
            ...mapActions([]),
        },
        computed: {
            ...mapGetters([]),
        },
        mounted() {
            this.$refs.canvas.width = this.$refs.board.offsetWidth;
            this.height = this.$refs.board.clientHeight;
            this.redraw()

            this.$refs.canvas.addEventListener("touchmove", (e) => e.preventDefault(), {passive: false});

            window.onresize = (e) => {
                this.$refs.canvas.width = this.$refs.board.offsetWidth;
                this.height = this.$refs.board.clientHeight;
                this.redraw()
            };
        },
        methods: {
            startDrag(ev) {
                if (!this.editable) return
                this.dragging = true;
                this.segments.push({lines: [], tool: this.tool})
                this.addMove(ev)
                // console.log(ev)
            },
            addMove(ev) {
                if (this.dragging) {
                    let x = (!!ev.touches ? ev.touches[0].clientX : ev.x) - ev.target.getBoundingClientRect().left;
                    let y = (!!ev.touches ? ev.touches[0].clientY : ev.y) - ev.target.getBoundingClientRect().top;
                    this.segments[this.segments.length - 1].lines.push({x, y})
                }
                this.redraw()
            },
            endDrag() {
                this.dragging = false
                this.redraw()
            },
            clear() {
                this.segments = [];
                this.redraw()
            },
            getSegments() {
                return this.segments;
            },
            getImage() {
                let
                    c = this.$refs.canvas,
                    ctx = c.getContext('2d'),
                    copy = document.createElement('canvas').getContext('2d'),
                    pixels = ctx.getImageData(0, 0, c.width, c.height),
                    l = pixels.data.length,
                    i,
                    bound = {
                        top: null,
                        left: null,
                        right: null,
                        bottom: null
                    },
                    x, y;

                for (i = 0; i < l; i += 4) {
                    if (pixels.data[i + 3] !== 0) {
                        x = (i / 4) % c.width;
                        y = ~~((i / 4) / c.width);

                        if (bound.top === null) {
                            bound.top = y;
                        }

                        if (bound.left === null) {
                            bound.left = x;
                        } else if (x < bound.left) {
                            bound.left = x;
                        }

                        if (bound.right === null) {
                            bound.right = x;
                        } else if (bound.right < x) {
                            bound.right = x;
                        }

                        if (bound.bottom === null) {
                            bound.bottom = y;
                        } else if (bound.bottom < y) {
                            bound.bottom = y;
                        }
                    }
                }

                let padding = 10;
                bound.top = Math.max(0, bound.top - padding)
                bound.left = Math.max(0, bound.left - padding)
                bound.right += padding
                bound.bottom += padding

                let trimHeight = bound.bottom - bound.top,
                    trimWidth = bound.right - bound.left,
                    trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);


                copy.canvas.width = trimWidth;
                copy.canvas.height = trimHeight;
                copy.putImageData(trimmed, 0, 0);

                return copy.canvas.toDataURL('image/png')
            },
            redraw() {
                let context = this.$refs.canvas.getContext('2d');
                context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
                context.lineJoin = "round";
                context.lineCap = "round";

                this.segments.forEach(s => {
                    context.beginPath();
                    if (s.tool === 0) {
                        context.strokeStyle = "#fff";
                        context.lineWidth = 30;
                    } else {
                        context.strokeStyle = "#000";
                        context.lineWidth = 2;
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
        }
    }
</script>

<style lang='scss' scoped>
    canvas {
        z-index: 2;
    }

    .board {
        overflow: hidden;
    }

    .board {
        position: relative;
    }

    .tools {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;

        button {
            display: block;
            width: 40px;
            height: 40px;
            border: 1px solid rgba(150, 150, 150, 0.4);
            border-radius: 50%;
            margin: 1em;
            background: rgba(150, 150, 150, 0.4);
            box-shadow: 1px 1px 2px rgba(150, 150, 150, 0.2);
            opacity: .5;

            &.active {
                opacity: 1;
            }

            &:active {
                opacity: 1;
            }
        }
    }
</style>