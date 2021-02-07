import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'
import firebase from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '5cf9dfd5-3449-485e-b5ae-70a60e997864',
    global: [],
    country: [],
    live: [],
    userProfile: localStorage.getItem('profile') || {},
    loggedIn: localStorage.getItem('isLoggedIn') || false
  },
  mutations: {
    setGlobal (state, payload) {
      state.global = payload
    },
    setCountry (state, payload) {
      state.country = payload
    },
    setLive (state, payload) {
      state.live = payload
    },
    setUser (state, payload) {
      state.loggedIn = true
      state.userProfile = payload
    }
  },
  actions: {
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers = { 'X-Access-Token': context.state.token }
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    getSummary (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + 'summary')
          .then((res) => {
            context.commit('setGlobal', res.data.Global)
            context.commit('setCountry', res.data.Countries)
            resolve(res.data)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getByCountryLive (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + 'country/' + payload)
          .then((res) => {
            context.commit('setLive', res.data)
            resolve(res.data)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    logIn (context) {
      return new Promise((resolve, reject) => {
        if (context.state.loggedIn) return
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
          .then((res) => {
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('profile', res.additionalUserInfo.profile.name)
            context.commit('setUser', res.additionalUserInfo.profile.name)
            resolve(res.additionalUserInfo.profile)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    logOut (context) {
      return new Promise((resolve, reject) => {
        firebase.auth().signOut()
          .then(res => {
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('profile')
            context.state.loggedIn = false
            context.state.userProfile = {}
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {
    getGlobal (state) {
      return state.global
    },
    getCountry (state) {
      return state.country
    },
    getChartData (state) {
      const sortData = state.country.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed) ? 1 : ((b.TotalConfirmed < a.TotalConfirmed) ? -1 : 0))
      const topGlobal = sortData.slice(0, 3)
      const datasets = topGlobal.map(a => {
        const randomColor = () => {
          const n = (Math.random() * 0xfffff * 1000000).toString(16)
          return '#' + n.slice(0, 6)
        }
        const newData = {
          label: a.Country,
          backgroundColor: randomColor(),
          data: [a.TotalConfirmed]
        }
        return newData
      })
      const dataSet = {
        labels: ['Total Confirm'],
        datasets
      }
      return dataSet
    },
    getChartLive (state) {
      const labels = state.live.map(a => {
        moment.locale('id')
        const date = moment(a.Date).format('LL')
        return date
      })
      const data = state.live.map(a => {
        return a.Cases
      })
      const datasets = [{
        label: 'Cases',
        borderColor: '#5A33E4',
        backgroundColor: '#5A33E4',
        fill: false,
        data
      }]
      const setData = {
        labels,
        datasets
      }
      return setData
    },
    getLive (state) {
      return state.live
    },
    isLogin (state) {
      return state.loggedIn
    },
    getProfile (state) {
      return state.userProfile
    }
  },
  modules: {
  }
})
