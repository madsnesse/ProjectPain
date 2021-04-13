<template>
    <b-container>
        <b-row align-h="center" class="my-3">
            <b-col>
                <b-button @click="toggleOne" :variant="!one ? 'info' : 'success'">
                    Continous
                </b-button>
            </b-col>
            <b-col>
                <b-button @click="toggleTwo" :variant="!two ? 'info' : 'success'">
                    Rhytmic
                </b-button>
            </b-col>
            <b-col>
                <b-button @click="toggleThree" :variant="!three ? 'info' : 'success'">
                    Brief
                </b-button>
            </b-col>
        </b-row>
        <b-row class="my-3">
            <b-col> 
                <b-form-select v-model="current" :options="options">
                    
                </b-form-select>
            </b-col>
        </b-row>
        <b-row>{{ selected }}</b-row>
    </b-container>
</template>


<script>
export default {
    data: function(){
        return {
            one: false,
            two: false,
            three: false,
            noSelected: 0,
            selected: [],
            sel: [false,false,false],
            current: 0,
            options: [
                { value:  0 , text: 'placeholder',disabled:true},
                { value:  1 , text:'liquor'},
                { value:  2 , text: 'stimulants such as coffee'},
                { value:  3 , text: 'eating' },
                { value:  4 , text: 'heat' },
                { value:  5 , text: 'cold' },
                { value:  6 , text: 'damp' },
                { value:  7 , text: 'weather changes' },
                { value:  8 , text: 'massage or use of a vibrator' },
                { value:  9 , text: 'pressure' },
                { value:  10 , text: 'no movement' },
                { value:  11 , text: 'movement' },
                { value:  12 , text: 'lying down' },
                { value:  13 , text: 'distraction (TV reading etc.)' },
                { value:  14 , text: 'urination or defecation' },
                { value:  15 , text: 'tension' },
                { value:  16 , text: 'bright lights' },
                { value:  17 , text: 'loud noises' },
                { value:  18 , text: 'going to work' },
                { value:  19 , text: 'intercourse' },
                { value:  20 , text: 'mild exercise' },
                { value:  21 , text: 'fatigue' },
                { value:  22 , text: 'intercourse' }
            ]
        }
    },watch:{
        current: function(){
            this.selectMult(this.current)
            
        }
    },
    methods: {
        selectMult: function(select) {
            console.log(select)
            if (this.noSelected <= 3){
                this.$set(this.options, select, Object.assign(this.options[select],{disabled:true}))
                this.$set(this.sel, select,)
                this.selected = this.selected.concat(select)
            }
            
            //selecteded.$set(selecteded,select)
        },
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