<template>
    <b-container style="background-color:cornflowerblue;">
        <b-row class="border-bottom border-dark">
            <b-col class="p-0" cols="4">
                <b-button @click="toggleButton(1)" :variant="btns[1]?'success':'secondary'" squared>Continous</b-button>
            </b-col>
            <b-col class="p-0" cols="4">
                <b-button @click="toggleButton(2)" :variant="btns[2]?'success':'secondary'" squared>Rhytmic</b-button>
            </b-col>
            <b-col class="p-0" cols="4">
                <b-button @click="toggleButton(3)" :variant="btns[3]?'success':'secondary'" squared>Brief</b-button>
            </b-col>
        </b-row>
        <b-row class="">
            
            <b-button 
                squared 
                v-b-toggle.increase 
                :variant="accordion[0]?'success':'primary'"
                @click="toggleAccord(0)"
                id="topOfInc"
                class="border-bottom border-dark text-center align-items-right">
                    Does the following <b>increase </b>your pain? <b-icon :hidden = "!accordion[0]" icon="chevron-up"></b-icon> <b-icon :hidden = "accordion[0]" icon="chevron-down"></b-icon>
            </b-button>
            <b-collapse id="increase" accordion="painchange">
                <b-button 
                    v-for="option in increaseOptions" 
                    :key="option.value"
                    squared
                    @click="selectMultInc(option.value)"
                    :variant="option.selected ? 'success' : 'secondary'"
                    class="border-bottom border-dark"
                    >
                    {{option.text}}
                </b-button>
            </b-collapse>
        </b-row>
        <b-row class="">
            <b-button
                squared 
                v-b-toggle.decrease 
                :variant="accordion[1]?'success':'primary'" 
                @click="toggleAccord(1)"
                id="topOfDec"
                class="border-bottom border-dark">
                    
                   <template> the following <b> decrease </b>your pain? </template>
                   <template #append><b-icon :hidden = '!accordion[1]' icon='chevron-up'></b-icon> <b-icon :hidden = 'accordion[1]' icon='chevron-down'></b-icon>
                </template>
            </b-button>
             <b-collapse id="decrease" accordion="painchange">
                <b-button 
                    v-for="option in decreaseOptions" 
                    :key="option.value"
                    squared
                    @click="selectMult(option.value)"
                    :variant="option.selected ? 'success' : 'secondary'"
                    class="border-bottom border-dark"
                    >
                    {{option.text}}
                </b-button>
            </b-collapse>
        </b-row>
    </b-container>
</template>


<script>
export default {
    components: {
    },
    data: function(){
        return {
            btns: [false,false,false],
            selected: [],
            current: 0,
            accordion: [false,false],
            increaseOptions: [
                { value:  1 , text:'liquor', selected: false},
                { value:  2 , text: 'stimulants such as coffee', selected: false},
                { value:  3 , text: 'eating' , selected: false},
                { value:  4 , text: 'heat' , selected: false},
                { value:  5 , text: 'cold' , selected: false},
                { value:  6 , text: 'damp' , selected: false},
                { value:  7 , text: 'weather changes', selected: false },
                { value:  8 , text: 'massage or use of a vibrator' , selected: false},
                { value:  9 , text: 'pressure' , selected: false},
                { value:  10 , text: 'no movement' , selected: false},
                { value:  11 , text: 'movement', selected: false },
                { value:  12 , text: 'lying down', selected: false },
                { value:  13 , text: 'distraction (TV reading etc.)', selected: false },
                { value:  14 , text: 'urination or defecation', selected: false },
                { value:  15 , text: 'tension' , selected: false},
                { value:  16 , text: 'bright lights' , selected: false},
                { value:  17 , text: 'loud noises' , selected: false},
                { value:  18 , text: 'going to work' , selected: false},
                { value:  19 , text: 'intercourse' , selected: false},
                { value:  20 , text: 'mild exercise' , selected: false},
                { value:  21 , text: 'fatigue' , selected: false},
                { value:  22 , text: 'intercourse' , selected: false}
            ],
            decreaseOptions: [
                { value:  1 , text:'liquor', selected: false},
                { value:  2 , text: 'stimulants such as coffee', selected: false},
                { value:  3 , text: 'eating' , selected: false},
                { value:  4 , text: 'heat' , selected: false},
                { value:  5 , text: 'cold' , selected: false},
                { value:  6 , text: 'damp' , selected: false},
                { value:  7 , text: 'weather changes', selected: false },
                { value:  8 , text: 'massage or use of a vibrator' , selected: false},
                { value:  9 , text: 'pressure' , selected: false},
                { value:  10 , text: 'no movement' , selected: false},
                { value:  11 , text: 'movement', selected: false },
                { value:  12 , text: 'lying down', selected: false },
                { value:  13 , text: 'distraction (TV reading etc.)', selected: false },
                { value:  14 , text: 'urination or defecation', selected: false },
                { value:  15 , text: 'tension' , selected: false},
                { value:  16 , text: 'bright lights' , selected: false},
                { value:  17 , text: 'loud noises' , selected: false},
                { value:  18 , text: 'going to work' , selected: false},
                { value:  19 , text: 'intercourse' , selected: false},
                { value:  20 , text: 'mild exercise' , selected: false},
                { value:  21 , text: 'fatigue' , selected: false},
                { value:  22 , text: 'intercourse' , selected: false}
            ]
        }
    },
    methods: {
        selectMultInc: function(select) {
            console.log(select)
            
            if(!this.increaseOptions[select-1].selected){
                this.selected = this.selected.concat(select)
            }else{
                this.selected = this.selected.filter(function(value){
                    return value != select;
                });
            }            
            this.$set(this.increaseOptions[select-1],'selected', !this.increaseOptions[select-1].selected)

            
            //selecteded.$set(selecteded,select)
        },
        selectMultDec: function(select) {
            console.log(select)
            
            if(!this.decreaseOptions[select-1].selected){
                this.selected = this.selected.concat(select)
            }else{
                this.selected = this.selected.filter(function(value){
                    return value != select;
                });
            }            
            this.$set(this.decreaseOptions[select-1],'selected', !this.decreaseOptions[select-1].selected)

            
            //selecteded.$set(selecteded,select)
        },
        toggleButton: function(i){
            var t = !this.btns[i]
            this.btns = [false,false,false]
            this.$set(this.btns, i, t)
        },
        toggleAccord: function(i){
            var t = !this.accordion[i]
            this.accordion = [false,false]
            var elem = document.getElementById("topOfInc")
            elem.scrollIntoView(true)
            this.$set(this.accordion, i, t)
        }
    }
}
</script>
<style scoped>

</style>