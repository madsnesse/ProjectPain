<template>
    <b-container>
        <b-col>
            <b-row align-h="center">
                <span id="test2"></span>

                <b-input-group>
                    <b-input-group-prepend id="pre">
                        <b-button variant="secondary" disabled>{{labels[0]}}</b-button>

                    </b-input-group-prepend>
                   <b-form-input type="range" :min = minimum :max = maximum class="slider" id="painstr" v-model="value"></b-form-input>
                    <b-input-group-append id="append">
                        <b-button disabled variant="secondary">{{labels[1]}}</b-button>
                    </b-input-group-append>
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
    #painstr{
        background-color: var(--primary);
        border: 0;
    }
</style>
