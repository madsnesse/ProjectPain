<template>
    <b-container>
        <b-col>
            <b-row align-h="center">
                <span id="test2"></span>

                <b-input-group>
                    <b-input-group-prepend id="pre">
                        <b-button variant="secondary" @click="current==minimum?current=current:current=current-1">{{labels[0]}}</b-button>

                    </b-input-group-prepend>
                   <b-form-input type="range" :min = minimum :max = maximum class="slider" v-model="current"></b-form-input>
                    <b-input-group-append id="append">
                        <b-button variant="secondary" @click="current ==maximum?current=current:current=current+1">{{labels[1]}}</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-row>
        </b-col>
    </b-container>
</template>

<script>
export default {
    props: {
        minimum: Number,
        maximum: Number,
        labels: Array,
        default: Number,
        value:Number
    },
    data(){
        return{
            current:this.value
        }
    },

    watch:{
        current: function(i){
            this.$emit('updateValue',i)
        }
    }
}
</script>

<style scoped>
    #painstr{
        background-color: var(--primary);
        border: 0;
    }
</style>
