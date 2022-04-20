const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EquipmentSchema = new Schema({
    _idUser : {
        type: Schema.ObjectId,
        ref : 'User'
    },
    date : {//This was just a string, I changed it bo be a propper date, Mongo allows it
        type : Date,
        default: Date.now,
        required : true
    },
    bonus : {
        type: Number,
        required : true
    },
    status : {
        type : String,
        required : true
    }
}, 
{
    timestamps : true
})

module.exports = mongoose.model('Equipment', EquipmentSchema)