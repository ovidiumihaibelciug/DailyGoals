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
    type: Number,
    required: true,
  },
  done: {
    type: Boolean,
    requored: false,
  }
});

const Goal = module.exports = mongoose.model('Goal', GoalSchema);
