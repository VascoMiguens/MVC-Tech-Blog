var moment = require("moment");
module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
    // return moment(time).fromNow();
  },
};
