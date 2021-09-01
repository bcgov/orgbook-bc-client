import Vue from "vue";
import moment from "moment";

Vue.filter("formatDate", function (value: string, format = "MMM DD, YYYY") {
  if (value) {
    return moment(value).format(format);
  }
});
