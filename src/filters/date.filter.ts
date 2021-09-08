import Vue from "vue";
import moment from "moment";

export function dateFilter(value: string, format = "MMM DD, YYYY"):string|undefined {
  if (value) {
    return moment(value).format(format);
  }
}


