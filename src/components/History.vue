<template>
    <b-container>
        <b-breadcrumb>
            <b-breadcrumb-item :to="'/home'">
                <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
                Home
            </b-breadcrumb-item>
            <b-breadcrumb-item :to="'/profile'">
                Profile
            </b-breadcrumb-item>
            <b-breadcrumb-item active>
                History
            </b-breadcrumb-item>
        </b-breadcrumb>

        <b-row align-h="center" class="my-5"><h1 id="welcome">History!</h1></b-row>
        <PainVisualizer :values = "valuesfromdb[currentEntry]"/>
        <b-row align-h="center" class="mt-2 mb-4">
          <b-form-input type="range" :min="0" :max="length" v-model="currentEntry"></b-form-input>
        </b-row>
        <b-row align-h="center">
            <b-col>
                <b-button class="buttons w-100" variant="secondary" to="/Profile">Go back</b-button>
            </b-col>
            <b-col>
                <b-button class="buttons w-100" variant="secondary" to="/Profile">kcab oG</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import * as pouchDB from "../database.js"
import PainVisualizer from './PainVisualizer.vue'
export default {
  components:{
      PainVisualizer
    },
  name: "Settings",
  data() {
    return {
        valuesfromdb: [],
        currentEntry: -1,
        length: 0
    };
  },
  created() {
      let vals = pouchDB.getAllDataFromDB()
      this.valuesfromdb = vals.rows
      this.length = this.valuesfromdb.length
      console.log(vals)
    
  }
};
</script>

<style scoped>
    #welcome {
        font-size: 200%;
        text-align: center;
    }

</style>
