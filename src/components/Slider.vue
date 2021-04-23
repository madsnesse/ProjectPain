<template>
    <b-container>
        <b-col>
            <b-row align-h="center">
                <span id="test2"></span>
                <b-input-group :prepend= labels[0] :append=labels[1]>
                   <b-form-input type="range" :min = minimum :max = maximum class="slider" id="painstr" v-model="value"></b-form-input>
                </b-input-group>
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
        maximum: Number,
        labels: Array,
        default: Number
    },
    data() {
        return {
            value: this.default,
            pain: this.values,
            out: ""
        }
    },
    watch: {
        value: {
            handler() {
                this.out = this.pain[this.value - 1]
                this.$emit('updateValue', this.value)
            }
        }
    },
    mounted: function(){
        this.out = this.pain[this.value - 1]
    }
}
</script>

<style scoped>
</style>