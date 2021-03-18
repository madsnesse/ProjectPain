<template>
    <b-container>
        <b-row align-h="center">
            <span id="test"></span>
            <p>{{ligma}}</p>
            1<input type="range" min="1" max="5" value="3" class="slider" id="sli">5
        </b-row>
        <b-row align-h="center">
            <span id="test1"></span>
            1<input type="range" min="1" max="5" value="3" class="slider" id="sli">5
        </b-row>
        <b-row align-h="center">
            <span id="test2"></span>
            1<input type="range" min="1" max="5" value="3" class="slider" id="sli">5
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: {
        ligma: String
    }
}
</script>