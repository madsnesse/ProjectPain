<template>
    <b-container>
        <b-col>
            <b-row align-h="center">
                <span id="test2"></span>
                Weak<input type="range" :min = minimum :max = maximum class="slider" id="painstr" v-model="index">Strong
            </b-row>
            <b-row align-h="center">
                {{ out }}
            </b-row>
        </b-col>
    </b-container>
</template>

<script>
export default {
    props: {
        values: Array,
        minimum: Number,
        maximum: Number
    },
    data() {
        return {
            index: Math.round(this.maximum / 2, 1),
            pain: this.values,
            out: ""
        }
    },
    watch: {
        index: {
            handler() {
                this.out = this.pain[this.index - 1]
            }
        }
    },
    mounted: function(){
        this.out = this.pain[this.index - 1]
    }
}
</script>