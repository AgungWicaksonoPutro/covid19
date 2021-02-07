<template>
<b-container class="mt-3">
    <div class="header d-flex mb-3">
        <h4>{{getLive[0].Country}}</h4>
    </div>
    <div class="set-data">
        <b-table
        id="my-table"
        :items="getLive"
        :fields="fields"
        responsive
        small
        >
        <template #cell(Cases)="data">
            <p>{{ setNumber(data.value) }}</p>
        </template>
        <template #cell(Date)="data">
            <p>{{ getDate(data.value) }}</p>
        </template>
        <template #cell(Status)="data">
            <p class="status">{{ data.value }}</p>
        </template>
        </b-table>
    </div>
</b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import numeral from 'numeral'
import moment from 'moment'

export default {
  name: 'TableDetails',
  data () {
    return {
      search: '',
      perPage: 15,
      currentPage: 1,
      filter: null,
      filterOn: [],
      fields: ['Country', 'Date', 'Cases', 'Status']
    }
  },
  computed: {
    ...mapGetters(['getLive']),
    rows () {
      return this.getCountry.length
    }
  },
  methods: {
    setNumber (num) {
      return numeral(num).format('0,0')
    },
    getDate (a) {
      moment.locale('id')
      return moment(a).format('LLL')
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.status{
    background-color: rgb(241, 255, 213);
    color: yellowgreen;
    width: fit-content;
    padding: 0.3rem;
    border-radius: 15px;
}
</style>
