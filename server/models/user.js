const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  googleId: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  isActive: {type : Boolean , default:false},
  isGain:  {type : Boolean , default:false},
  earnedPoints : {type : Number, default : 0},
  earnedCoin_time : [
        {
            contestId : {type : String},
            timeWithDate : {type : Date},
            coines_earned : {type : Number},
            reason : {type : String}
        }
  ],
 
});

const User = mongoose.model("userData", userSchema);

module.exports = { User };
