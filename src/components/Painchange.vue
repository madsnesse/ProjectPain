<template>
    <b-container>
        <b-row align-h="center">
            <b-form-checkbox name="check-button" button @input="toggleOne()" :button-variant="!one ? 'info' : 'success'">
                Continous
            </b-form-checkbox>
            <b-form-checkbox name="check-button" button @input="toggleTwo()" :button-variant="!two ? 'info' : 'success'">
                Rythmic
            </b-form-checkbox>
            <b-form-checkbox name="check-button" button @input="toggleThree()" :button-variant="!three ? 'info' : 'success'">
                brief
            </b-form-checkbox>
        </b-row>
    </b-container>
</template>


<script>

export default {
    data: function(){
        return {
            one: false,
            two: false,
            three: false
        }
    },
    methods: {
        toggleOne: function () {
            this.one = !this.one
            this.two = false
            this.three = false
        },
        toggleTwo: function () {
            this.two = !this.two
            this.one = false
            this.three = false
        },
        toggleThree: function () {
            this.three = !this.three
            this.one = false
            this.two = false
        }
    }
}
</script>