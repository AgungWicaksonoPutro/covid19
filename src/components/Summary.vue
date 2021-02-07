<template>
    <b-container class="summary shadow-sm">
        <p>{{getGlobal.Date === undefined ? 'Tanggal: ' + getDate(new Date()) : 'Updated Global Data: ' + getDate(getGlobal.Date)}}</p>
        <b-row no-gutters class="row">
            <b-col class="case" xl="5" lg="5" md="5" sm="5" cols="12">
                <div class="card total-confirmed">
                    <p>Total Confirmed</p>
                    <h4>{{setNumber(getGlobal.TotalConfirmed)}}</h4>
                </div>
                <div class="card total-deaths">
                    <p>Total Deaths</p>
                    <h4>{{setNumber(getGlobal.TotalDeaths)}}</h4>
                </div>
                <div class="card total-recovered">
                    <p>Total Recovered</p>
                    <h4>{{setNumber(getGlobal.TotalRecovered)}}</h4>
                </div>
                <div class="card total-new-confirmed">
                    <p>New Confirmed</p>
                    <h4>{{setNumber(getGlobal.NewConfirmed)}}</h4>
                </div>
                <div class="card total-new-deaths">
                    <p>New Deaths</p>
                    <h4>{{setNumber(getGlobal.NewDeaths)}}</h4>
                </div>
                <div class="card total-new-recovered">
                    <p>New Recovered</p>
                    <h4>{{setNumber(getGlobal.NewRecovered)}}</h4>
                </div>
            </b-col>
            <b-col xl="7" lg="7" md="7" sm="7" cols="12">
                <h4 class="title text-center">Top 3 Confirmed Cases</h4>
                <Chart
                :chartData="getChartData"
                :options="chartOptions"
                />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import numeral from 'numeral'
import Chart from './Chart'
export default {
  name: 'Summary',
  components: {
    Chart
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
  methods: {
    getDate (a) {
      moment.locale('en')
      return moment(a).format('LLL')
    },
    setNumber (num) {
      return numeral(num).format('0,0')
    }
  },
  computed: {
    ...mapGetters(['getGlobal', 'getChartData'])
  }
}
</script>

<style scoped>
.summary{
    background-color: #ffffff;
    border-radius: 1.5rem;
    padding: 1rem;
}
.case{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.card{
    flex-basis: 40%;
    margin: 1rem;
    padding: 0.5rem;
    font-weight: 200;
    font-size: 12px;
}
.total-confirmed{
    border: none;
    border-left: 3px solid #FD4E71;
    color: #FD4E71;
    background-color: #FFF8FA;
}
.total-deaths{
    border: none;
    border-left: 3px solid #28D7A6;
    color: #28D7A6;
    background-color: #E6FFF8;
}
.total-recovered{
    border: none;
    border-left: 3px solid #E16A1A;
    color: #E16A1A;
    background-color: #FFF7F2;
}
.total-new-confirmed{
    border: none;
    border-left: 3px solid #5A33E4;
    color: #5A33E4;
    background-color: #F5F5FF;
}
.total-new-deaths{
    border: none;
    border-left: 3px solid #62559D;
    color: #62559D;
    background-color: #EEECF9;
}
.total-new-recovered{
    border: none;
    border-left: 3px solid #0096CA;
    color: #0096CA;
    background-color: #E7F7FF;
}
.card p{
    margin: 0;
    color: #b4b4b4;
}
</style>
