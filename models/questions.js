

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type:String, required:true },
    answerOptions: [
        {
            option: {type:Number, default:1},
            answer:{type:mongoose.Schema.Types.Mixed, required:true},
            isCorrectAnswer: {type:Boolean, default:false}
        },
        {
            option: {type:Number, default:2},
            answer:{type:mongoose.Schema.Types.Mixed, required:true},
            isCorrectAnswer: {type:Boolean, default:false}
        },
        {
            option:{type:Number, default:3},
            answer: {type:mongoose.Schema.Types.Mixed, required:true},
            isCorrectAnswer: {type:Boolean, default:false}
        },
        {
            option: {type:Number, default:4},
            answer:{type:mongoose.Schema.Types.Mixed, required:true},
            isCorrectAnswer: {type:Boolean, default:false}
        }
    ]
})

module.exports = [questionSchema]