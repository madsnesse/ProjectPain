

<template> 
    <b-container >
        <b-row><p class="border-primary text-right">{{ display }}</p></b-row>
        <b-row>
            <b-col cols="8"  class="px-0">
                <b-container class="text-center">
                    <b-row>
                        <b-button-group class="btn-block">
                            <b-col class="px-0"><b-button squared  variant="primary" @click="count (7)" class="w-100 px-0">7</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="primary" @click="count (8)" class="w-100">8</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="primary" @click="count (9)" class="w-100">9</b-button></b-col>
                        </b-button-group>
                    </b-row>
                    <b-row>
                        <b-button-group class="btn-block">
                            <b-col class="px-0"><b-button squared variant="primary" @click="count (4)" class="w-100">4</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="primary" @click="count (5)" class="w-100">5</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="primary" @click="count (6)" class="w-100">6</b-button></b-col>
                        </b-button-group>
                    </b-row>
                    <b-row>
                        <b-button-group class="btn-block">
                            <b-col class="px-0"><b-button squared variant="primary" @click="count (1)" class="w-100">1</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="primary" @click="count (2)" class="w-100">2</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="primary" @click="count (3)" class="w-100">3</b-button></b-col>
                        </b-button-group>
                    </b-row>
                    <b-row>
                        <b-button-group class="btn-block">
                            <b-col class="px-0"><b-button squared variant="primary" @click="count (0)" class="w-100">0</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="primary" @click="count (2)" class="w-100">.</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="primary" @click="count (3)" class="w-100">*10^x</b-button></b-col>
                        </b-button-group>
                    </b-row>
                </b-container>
            </b-col>
            <b-col cols="4" class="px-0">
                <b-container id="other" >
                    <b-row>
                        <b-button-group class="btn-block">
                            <b-col class="px-0"><b-button  squared variant="secondary" @click="del()" class="w-100">DEL</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="secondary" @click="clear()" class="w-100">AC</b-button></b-col>
                        </b-button-group>
                    </b-row>
                    <b-row>
                        <b-button-group class="btn-block">
                            <b-col class="px-0"><b-button squared variant="secondary" v-on:click="operate('*')" class="w-100">X</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="secondary" @click="operate('/')" class="w-100">/</b-button></b-col>
                        </b-button-group>
                    </b-row>
                    <b-row>
                        <b-button-group class="btn-block">
                            <b-col class="px-0"><b-button squared variant="secondary" @click="operate('+')" class="w-100">+</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="secondary" @click="operate('-')" class="w-100">-</b-button></b-col>
                        </b-button-group>
                    </b-row>
                    <b-row>
                        <b-button-group class="btn-block">
                            <b-col class="px-0"><b-button squared variant="secondary" @click="getStored()" class="w-100">ANS</b-button></b-col>
                            <b-col class="px-0"><b-button squared variant="secondary" @click="equals()" class="w-100">=</b-button></b-col>
                        </b-button-group>
                    </b-row>
                </b-container>  	
            </b-col>
        </b-row>  
    </b-container>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return{
      display: "0",
      current: 0,
      stored: 0,
      operator: null
    }
  },
  props: {
    msg: String
  },
  methods: {
    count(i) {
        this.display += ""+i;
        this.current = parseInt(this.display);
        this.display = this.current;

      
    },
    operate(op) {
        this.stored = this.current;
        this.display = "0";
        this.operator = op;
    },
    clear() {
        this.display = "0";
        this.current = 0;
        this.operator = null;
    },
    del() {
        this.display = this.display.substring(0, this.display.length-1);
        this.current = parseInt(this.display)
    },
    multiply() {
        this.stored = this.stored * this.current;
        this.current = this.stored;
        this.display = this.stored;
    },
    divide() {
        this.stored = this.stored / this.current;
        this.current = this.stored;
        this.display = this.stored;
    },
    add() {
        this.stored = this.stored + this.current;
        this.current = this.stored;
        this.display = this.stored;
    },
    subtract() {
        this.stored = this.stored - this.current;
        this.current = this.stored;
        this.display = this.stored;
    },
    getStored() {
        this.current = this.stored;
        this.display = this.stored;
    },
    equals() {
        switch (this.operator){
            case '+':
                this.add();
                break;
            case '-':
                this.subtract();
                break;
            case '*':
                this.multiply();
                break;
            case '/':
                this.divide();
                break;
            default:
                this.clear();
                break;
        }
    }
  }
  
}
</script>

