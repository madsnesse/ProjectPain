<template>
    <b-container>
        <b-row align-h="center" class="my-2">
            <pain-visualizer></pain-visualizer>
        </b-row>
        <b-row align-h="between">
            <b-col class="text-center my-5"><router-link tag="b-button" class="buttons" to="/home">Back</router-link></b-col>
            <b-col class="text-center my-5"><router-link tag="b-button" class="buttons" to="/Painregistry">Register</router-link></b-col>
        </b-row>
    </b-container>
</template>

<script>
import PainVisualizer from './PainVisualizer.vue'
export default {
  components: { PainVisualizer },
    
}
</script>