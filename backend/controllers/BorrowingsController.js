const Borrowing = require('../models/Borrowing')

const BorrowingsController = {
    createBorrowing: async (req, res) => {
        try{
            console.log(req.body);

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