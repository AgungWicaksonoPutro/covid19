<template>
    <b-row no-gutters>
      <b-col class="left" xl="1" lg="1" md="1" sm="1" cols="1">
        <Sidebar/>
      </b-col>
      <b-col class="right" xl="11" lg="11" md="11" sm="11" cols="11">
        <Bedge/>
        <router-view/>
      </b-col>
    </b-row>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Bedge from '../components/Bedge'

import { mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    Sidebar,
    Bedge
  },
  methods: {
    ...mapActions(['getSummary'])
  },
  mounted () {
    this.getSummary()
  }
}
</script>

<style>
h3{
  font-weight: 300;
  letter-spacing: 1px;
}
</style>
