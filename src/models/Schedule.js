const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
     name: {
          type: String
     },
     date: {
          type: String
     },
     user: {
          type: String
     },
     invitedEmails: {
          type: Array
     }
})

module.exports = Schedule = mongoose.model("schedule", ScheduleSchema);