<template>
  <b-container>
        <b-row><b-container class="px-3 py-2 text-center registry-container">How would you describe the <i>cycle</i> of your pain?</b-container></b-row>
        <b-row >
            <b-col class="p-0" cols="4">
                <b-button @click="toggleButton(0)" variant='outline-secondary' squared >Continous</b-button>
            </b-col>
            <b-col class="p-0" cols="4">
                <b-button @click="toggleButton(1)" variant='outline-secondary' squared  > Rhythmic</b-button>
            </b-col>
            <b-col class="p-0" cols="4">
                <b-button @click="toggleButton(2)" variant='outline-secondary' squared >Brief</b-button>
            </b-col>
        </b-row>
    <b-row>
      <br>
    </b-row>
        <b-row class="mb-4">

            <b-button
                squared
                size="md"
                v-b-toggle.increase
                variant='outline-secondary'
                @click="toggleAccord(0)"
                id="topOfInc"
                class="d-flex justify-content-center align-items-right text-left"
                :class="accordion[0]?'border-light':'border-bottom'">

                        <b-container class="w-100 text">Does the following <b>increase</b> your pain?</b-container>

                        <b-iconstack>
                            <b-icon stacked :hidden = "!accordion[0]" icon="chevron-up" scale="1"></b-icon>
                            <b-icon stacked :hidden = "accordion[0]" icon="chevron-down" scale="1"></b-icon>
                        </b-iconstack>
            </b-button>
            <b-collapse id="increase" accordion="painchange">
                <b-button
                    v-for="option in increaseOptions"
                    :key="option.value"
                    squared
                    @click="selectMultInc(option.value)"
                    variant="secondary"
                    class=""
                    >
                    <b-container class="d-flex justify-content-center text-left">
                    <b-container class="">{{option.text}}</b-container>

                        <b-iconstack>
                            <b-icon stacked :hidden = "!option.selected" icon="dash" scale="1"></b-icon> 
                            <b-icon stacked :hidden = "option.selected" icon="plus" scale="1"></b-icon>
                        </b-iconstack>
                    </b-container>
                </b-button>
            </b-collapse>
            <b-button
                squared
                size="md"
                v-b-toggle.decrease
                variant='outline-secondary'
                @click="toggleAccord(1)"
                id="topOfDec"
                class="d-flex justify-content-center text-left"
                >
                        <b-container class="w-100">Does the following <b>decrease</b> your pain?</b-container>

                        <b-iconstack>
                            <b-icon stacked :hidden = "!accordion[1]" icon="chevron-up" scale="1"></b-icon>
                            <b-icon stacked :hidden = "accordion[1]" icon="chevron-down" scale="1"></b-icon>
                        </b-iconstack>

            </b-button>
             <b-collapse id="decrease" accordion="painchange">
                <b-button
                    v-for="option in decreaseOptions"
                    :key="option.value"
                    squared
                    @click="selectMultDec(option.value)"
                    variant="secondary"
                    class="w-100"
                    
                    >
                    <b-container class="d-flex justify-content-center text-left">
                    <b-container class="">{{option.text}}</b-container>

                        <b-iconstack>
                            <b-icon stacked :hidden = "!option.selected" icon="dash" scale="1"></b-icon>
                            <b-icon stacked :hidden = "option.selected" icon="plus" scale="1"></b-icon>
                        </b-iconstack>
                    </b-container>
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

            if(!this.increaseOptions[select-1].selected){
                this.selected = this.selected.concat(select)
            }else{
                this.selected = this.selected.filter(function(value){
                    return value != select;
                });
            }
            this.$set(this.increaseOptions[select-1],'selected', !this.increaseOptions[select-1].selected)
            this.update()
        },
        selectMultDec: function(select) {

            if(!this.decreaseOptions[select-1].selected){
                this.selected = this.selected.concat(select)
            }else{
                this.selected = this.selected.filter(function(value){
                    return value != select;
                });
            }
            this.$set(this.decreaseOptions[select-1],'selected', !this.decreaseOptions[select-1].selected)
            this.update()
        },
        update: function(){
            var inc = new Array();
            var dec = new Array();
            for(var i = 0;   i < this.increaseOptions.length; i++){
                if (this.increaseOptions[i].selected){
                    inc.push(i);
                }
                if (this.decreaseOptions[i].selected){
                    dec.push(i);
                }
            }
            var ch = 0;
            for (var j = 0; j < this.btns.length; j++){
                if (this.btns[j]){
                    ch = j;
                }
            }
            var output = {change:ch ,increase: inc, decrease: dec}
            this.$emit('update', output);
        },
        toggleButton: function(i){
            var t = !this.btns[i]
            this.btns = [false,false,false]
            this.$set(this.btns, i, t)
            this.update();
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
