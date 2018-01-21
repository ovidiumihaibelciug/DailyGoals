const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  done: {
    type: Number,
    requored: false,
  }
});

const Goal = module.exports = mongoose.model('Goal', GoalSchema);
