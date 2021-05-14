<template>
    
    <b-container>
        
        <b-button
            v-for="btn in this.options"
            squared
            class="border-bottom"
            :key="btn.value"
            :variant="btn.selected ? 'success':'secondary'"
            >
                {{btn.text}}
        </b-button>
    </b-container>
</template>

<script>
export default{
    data: function() {
        return{
            index : 0,
            options: [
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
    },methods:{
        handleScroll(i){
            console.log(i)
        }
    }
}
</script>
