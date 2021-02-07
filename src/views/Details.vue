<template>
  <b-container class="mt-3 mb-3" fluid>
    <div class="header d-flex mb-4 align-items-center">
        <button class="d-flex align-items-center mr-3 shadow-sm" @click.prevent="$router.go(-1)"><b-icon class="d-block mx-auto" icon="arrow-left" font-scale="1.2"></b-icon>Back</button>
        <div class="title">Details  Last Month</div>
    </div>
    <b-container class="card shadow-sm">
        <ChartDetails :chartData="getChartLive" :options="chartOptions"/>
    </b-container>
    <b-container class="card mt-3 shadow-sm">
        <TableDetails/>
    </b-container>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartDetails from '../components/ChartDetails'
import TableDetails from '../components/TableDetails'
export default {
  name: 'Details',
  components: {
    ChartDetails,
    TableDetails
  },
  data () {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 30000000,
              stepSize: 5000000,
              reverse: false,
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getChartLive'])
  }
}
</script>

<style scoped>
.card{
    background-color: #fff;
    border: none;
    padding: 1rem;
}
button{
    background-color: #fff;
    border: none;
    color: #000000;
    padding: 5px 10px;
    border-radius: 20px 0 0 20px;
}
.title{
    font-weight: 500;
    font-size: 20px;
}
</style>
