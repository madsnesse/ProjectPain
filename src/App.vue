<template>
    <b-container id="app" >
      <b-row align-h="center">
        <b-col md="4" cols="12" id="mainColumn">
          <router-view></router-view>
        </b-col>

      </b-row>
    </b-container>

</template>

<script>
export default{
  name: 'App'
}
</script>

<style scoped>
  #mainColumn {
    background-color: var(--primary);
    color: rgb(0, 0, 0);
    min-height: 100vh;
  }

  #app {
    background-color: var(--background);
    min-height: 100vh;
    min-width: 100%;
  }
</style>

<style lang="scss">
@import './assets/custom.scss';
@import './node_modules/bootstrap/scss/bootstrap.scss';
</style>
