<template>
    <b-container>
        <b-row align-h="center" class="my-2">
            <pain-visualizer></pain-visualizer>
        </b-row>
        <b-row align-h="between">
            <b-col class="text-center my-5"><b-button class="w-100" variant="primary" to="/home">Back</b-button></b-col>
            <b-col class="text-center my-5"><b-button class="w-100" variant="primary" to="/Painregistry">Register</b-button></b-col>
        </b-row>
    </b-container>
</template>

<script>
import PainVisualizer from './PainVisualizer.vue'
export default {
  components: { PainVisualizer },
    
}
</script>