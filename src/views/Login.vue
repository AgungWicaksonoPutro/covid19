<template>
    <div>
        <button @click.prevent="setLogIn">Login</button>
        <button @click.prevent="setLogOut">Logout</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  methods: {
    ...mapActions(['logIn', 'logOut']),
    setLogIn () {
      this.logIn()
        .then(res => {
          this.$router.push({ name: 'Overview' })
        })
    }
  }
}
</script>

<style scoped>

</style>
