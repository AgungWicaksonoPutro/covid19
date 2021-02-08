<template>
<b-container class="mt-3 countries shadow-sm">
    <div class="header d-flex mb-3">
        <h4>Data By Country</h4>
        <b-input-group class="ml-auto">
            <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Search Country"
            ></b-form-input>
        </b-input-group>
    </div>
    <div class="set-data">
        <b-table
        id="my-table"
        :items="getCountry"
        :fields="fields"
        :filter="filter"
        :filter-included-fields="filterOn"
        :per-page="perPage"
        :current-page="currentPage"
        responsive
        small
        @filtered="onFiltered"
        >
        <template #cell(Country)="data">
            <p><span class="flag"><CountryFlag :country='data.item.CountryCode'/></span>{{ data.value}}</p>
        </template>
        <template #cell(TotalDeaths)="data">
            <p>{{ setNumber(data.value) }}</p>
        </template>
        <template #cell(TotalConfirmed)="data">
            <p>{{ setNumber(data.value) }}</p>
        </template>
        <template #cell(TotalRecovered)="data">
            <p>{{ setNumber(data.value) }}</p>
        </template>
        <template #cell(NewConfirmed)="data">
            <p>{{ setNumber(data.value) }}</p>
        </template>
        <template #cell(NewDeaths)="data">
            <p>{{ setNumber(data.value) }}</p>
        </template>
        <template #cell(NewRecovered)="data">
            <p>{{ setNumber(data.value) }}</p>
        </template>
        <template #cell(Details)="data">
            <button class="private" v-if="data.item.CountryCode === 'US'">Private</button>
            <button class="button" v-else @click="setDataByCountry(data.item.Slug)"><b-icon icon="graph-up"></b-icon></button>
        </template>
        </b-table>
        <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        aria-controls="my-table"
        ></b-pagination>
    </div>
</b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import numeral from 'numeral'
import moment from 'moment'
import CountryFlag from 'vue-country-flag'

export default {
  name: 'TableCountries',
  data () {
    return {
      search: '',
      perPage: 15,
      currentPage: 1,
      filter: null,
      filterOn: [],
      fields: ['Country', 'TotalConfirmed', 'TotalDeaths', 'TotalRecovered', 'NewConfirmed', 'NewDeaths', 'NewRecovered', 'Details']
    }
  },
  components: {
    CountryFlag
  },
  computed: {
    ...mapGetters(['getCountry']),
    rows () {
      return this.getCountry.length
    }
  },
  methods: {
    ...mapActions(['getByCountryLive']),
    setNumber (num) {
      return numeral(num).format('0,0')
    },
    setSearch () {
      const key = this.search
      this.getCountry.Country.includes(key)
    },
    getDate (a) {
      moment.locale('id')
      return moment(a).format('LLL')
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    setDataByCountry (code) {
      const currentDate = new Date()
      currentDate.setHours(0, 0, 0, 0)
      const startDate = moment(currentDate)
      startDate.add(-1, 'month')
      const url = `${code}/status/confirmed?from=${startDate._d.toISOString()}&to=${currentDate.toISOString()}`
      this.getByCountryLive(url)
        .then(res => {
          this.$router.push('/details')
          this.$toastr.s('Success', 'Data Updated!')
        })
        .catch(err => {
          console.log(err)
          this.$toastr.e('Error', 'Iam Sorry Internal Server Error, Please Refresh Page!')
        })
    }
  }
}
</script>

<style scoped>
.countries{
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 1rem;
}
.button{
    width: 100%;
    background-color: #5A33E4;
    color: #F5F5FF;
    border: none;
    outline: none;
    border-radius: 2rem;
}
.button:hover{
    background-color: #F5F5FF;
    color: #5A33E4;
}
.input-group{
    width: 30%;
}
.private{
  border: none;
  outline: none;
  border-radius: 20px;
  background-color: rgb(255, 239, 239);
  color: rgb(212, 69, 69);
}
</style>
