const mongoose = require('mongoose')
require('dotenv').config()

const connectionDb = mongoose.connect(process.env.MONGO_URL);


module.exports={connectionDb}