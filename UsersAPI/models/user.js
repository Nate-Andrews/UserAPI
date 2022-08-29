const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    ssn:{
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('user', userSchema)