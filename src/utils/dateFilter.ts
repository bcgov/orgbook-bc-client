import Vue from "vue"
import moment from 'moment'

Vue.filter('formatDate', function(value:string) {
  if (value) {
    return moment(String(value)).format('MMM DD, YYYY')
  }
})