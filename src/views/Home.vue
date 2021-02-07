<template>
    <b-row no-gutters>
      <div class="left">
        <Sidebar/>
      </div>
      <div class="right">
        <Bedge/>
        <router-view/>
      </div>
    </b-row>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Bedge from '../components/Bedge'

import { mapActions } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      show: true
    }
  },
  components: {
    Sidebar,
    Bedge
  },
  methods: {
    ...mapActions(['getSummary']),
    toggle () {
      this.show = !this.show
    }
  },
  mounted () {
    this.getSummary()
  }
}
</script>

<style>
.left{
  float: left;
  width: 10%;
  z-index: 999;
}

.right{
  float: right;
  width: 90%;
}

h3{
  font-weight: 300;
  letter-spacing: 1px;
}

@media (max-width: 360px) {
    .left{
      position: fixed;
      width: 30%;
      visibility: hidden;
    }
    .right{
      width: 100%;
    }
}

@media (max-width: 550px) {
    .left{
      position: fixed;
      width: 30%;
      visibility: hidden;
    }
    .right{
      width: 100%;
    }
}

@media (max-width: 795px) {
    .left{
      position: fixed;
      width: 30%;
      visibility: hidden;
    }
    .right{
      width: 100%;
    }
}
</style>
