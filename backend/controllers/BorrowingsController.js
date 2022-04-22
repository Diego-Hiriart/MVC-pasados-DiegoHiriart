const Borrowing = require('../models/Borrowing')

const BorrowingsController = {
    createBorrowing: async (req, res) => {
        try{
            console.log(req.body);

            //Get end date and actual return date 
            const end = new Date(req.body.borrowEnd);
            const returned = new Date(req.body.returnDate);
            let fine = 0;
            let days =0;

            //If it was returned later than agreed, calculate fine
            if(returned > end){
                //Calculate fine
                days = parseInt((returned - end) / (1000 * 60 * 60 * 24));//(1000 * 60 * 60 * 24) to get days of difference
                fine = days * 5
            }//If it was returned on time, the is no fine

            //Set fine value in the JSON
            req.body.fine = fine;

            const borrowing = new Borrowing(req.body);

            await borrowing.save();

            if (!borrowing){
                return res.status(400).send({message: 'Borrowing not found'})
            }

            return res.send(borrowing);
        }catch (e) {
            res.status(500).send({error: e.message});
        }
    },

    getAllBorrowings: async (req, res) => {
        try{
            const borrowing = await Borrowing.find({}).populate('_idUser')
            if(!borrowing){
                return res.status(400).send({message: 'Could not find borrowings'})
            }
            return res.send(borrowing);
        }catch (e) {
            res.status(500).send({error: e.message});
        }
    }
}

module.exports = BorrowingsController