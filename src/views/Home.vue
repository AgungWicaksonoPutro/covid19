<template>
    <b-row no-gutters>
      <div class="left" :class="[show ? 'show' : '']">
        <Sidebar @close-menu="toggle"/>
      </div>
      <div class="right">
        <Bedge/>
        <button @click.prevent="toggle" class="btn mx-3 mt-3 bg-white shadow-sm">
          <b-icon v-if="show" icon="x" font-scale="1"></b-icon>
          <b-icon v-else icon="menu-app" font-scale="1"></b-icon>
          </button>
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
      show: false
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
      .then((res) => {
        this.$toastr.s('Success', 'Data Updated!')
      })
      .catch((err) => {
        console.log(err)
        this.$toastr.e('Error', 'Iam Sorry Internal Server Error, Please Refresh Page!')
      })
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
.btn{
  visibility: hidden;
  float: right;
  position: sticky;
  top: 1rem;
  z-index: 9999;
}

@media (max-width: 360px) {
    .left{
      position: fixed;
      width: 30%;
      visibility: hidden;
      transform: translateX(-120px);
      transition: all 0.6s;
    }
    .right{
      width: 100%;
    }
    .btn{
      visibility: visible;
    }
}

@media (max-width: 540px) {
    .left{
      position: fixed;
      width: 30%;
      visibility: hidden;
      transform: translateX(-120px);
      transition: all 0.6s;
    }
    .right{
      width: 100%;
    }
    .btn{
      visibility: visible;
    }
}

@media (max-width: 795px) {
    .left{
      position: fixed;
      width: 30%;
      visibility: hidden;
      transform: translateX(-250px);
      transition: all 0.6s;
    }
    .right{
      width: 100%;
    }
    .btn{
      visibility: visible;
    }
}

.show{
  visibility: visible;
  transition: all 0.6s;
  transform: translateX(0px);
}

</style>
