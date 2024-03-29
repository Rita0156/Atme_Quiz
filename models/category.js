const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  
  points: {
    type: Number,
    required: true,
  },
  questionSet: [],
  entryCoins: {
    type: Number,
    required: true,
    default: 0,
  },
  time_for_quiz: {
    type: Number,
    default: 60,
  },
  quizImage : {
    type : String
  }
});

const CategoryModel = mongoose.model("quiz", categorySchema);

module.exports = { CategoryModel };
