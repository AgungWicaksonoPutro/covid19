<template>
    <b-container fluid>
        <h5 class="mt-4">Hi {{getProfile}}, May you always be in good health</h5>
        <Summary/>
        <Table/>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Table from '../components/TableCountries'
import Summary from '../components/Summary'
export default {
  name: 'Overview',
  components: {
    Summary,
    Table
  },
  computed: {
    ...mapGetters(['getProfile'])
  }
}
</script>

<style scoped>

</style>
