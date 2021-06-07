<template>
  <b-container id="main">
    <b-breadcrumb>
      <b-breadcrumb-item :to="'/home'">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
         Home
       </b-breadcrumb-item>
     <b-breadcrumb-item active>
        Profile
      </b-breadcrumb-item>
   </b-breadcrumb>

    <b-row align-h="center" class="my-5"><h1 id="welcome">Profile!</h1></b-row>
    <b-row align-h="center" class="my-5"
      > <b-button class="buttons" variant="outline-secondary" @click="historyVis = !historyVis">Pain History</b-button>

    </b-row>

          <History  :hidden="historyVis" :valuesfromdb="valuesfromdb"/>
    <b-row align-h="center" class="my-5"
      ><b-button class="buttons" variant="outline-secondary" to="/settings">Settings</b-button>
      </b-row>

    <b-row align-h="center" class="my-5"
      ><b-button class="buttons" variant="secondary" to="/home">Return to Home</b-button>
      </b-row>
  </b-container>
</template>


<script>

    import * as pouchDB from "../database.js"
    import History  from "./History.vue";
export default {
    name: "Profile",
    components: {
        History
    },
    data(){
        return {
            valuesfromdb:[],
            length:0,
            historyVis:true,
            vals:{
            }
        }
    },
    methods:{
        getFromdb: pouchDB.getAllDataFromDB
    },
    async mounted() {
        let vals = await pouchDB.getAllDataFromDB();
        console.log("vals is: " + vals);
        this.vals = vals;
        this.valuesfromdb = vals.rows;
        this.length = vals.total_rows;
        console.log(vals)
    }}
</script>

<style scoped>
#welcome {
  font-size: 200%;
  text-align: center;
}
.buttons {
  width: 50%;
}
</style>
