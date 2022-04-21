const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BorrowingSchema = new Schema({
    _idUser : {
        type: Schema.ObjectId,
        ref : 'User'
    },
    borrowStart : {//This was just a string, I changed it to be a propper date, Mongo allows it
        type : Date,
        default: Date.now,
        required : true
    },
    borrowEnd : {
        type : Date,
        default: Date.now,
        required : true
    },
    returnDate : {
        type : Date,
        default: Date.now,
        required : true
    },
    fine : {//Multa
        type: Number,
        default : 0,
        required : true
    },
    status : {
        type : String,
        default : "returned",
        required : true
    }
}, 
{
    timestamps : true
})

module.exports = mongoose.model('Borrowing', BorrowingSchema)