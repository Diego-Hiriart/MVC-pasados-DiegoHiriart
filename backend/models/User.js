const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userId: {
        type: String,
        required : true
    },
    firstName: {
        type: String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    phone: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : false
    }
}, 
{
    timestamps : true
})

module.exports = mongoose.model('User', UserSchema)