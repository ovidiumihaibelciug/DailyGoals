// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const GoalSchema = new Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   user_id: {
//     type: String,
//     required: true,
//   },
//   streak: {
//     type: Number,
//     required: true
//   }
// });

// const Goal = module.exports = mongoose.model('Goal', GoalSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  streak: {
    type: Number,
    required: true
  }
});

const Goal = module.exports = mongoose.model('Goal', GoalSchema);
