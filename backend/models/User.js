const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    UserId: {
        type: String,
        required : true
    },
    firstname: {
        type: String,
        required : true
    },
    lastname : {
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