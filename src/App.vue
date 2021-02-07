<template>
  <b-container id="app" fluid>
    <router-view></router-view>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorRequest'])
  },
  created () {
    this.interceptorRequest()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

*{
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

.right{
  position: relative;
}
</style>
