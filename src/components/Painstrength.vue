<template>
    <b-container>
        <b-col>
            <b-row align-h="center">
                <span id="test2"></span>
                Weak<input type="range" min="1" max="5" class="slider" id="painstr" v-model="index">Strong
            </b-row>
            <b-row align-h="center">
                {{ out }}
            </b-row>
        </b-col>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            index: 3,
            pain: ["Light tickle", "Kinda annoying", "this isn't good", "Ouch squared", "help"],
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