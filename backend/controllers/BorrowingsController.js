const Borrowing = require('../models/Borrowing')

const BorrowingsController = {
    createBorrowing: async (req, res) => {
        try{

            //Get end date and actual return date
            /* This awful ".replace(/-/g, '\/').replace(/T.+/, '')" is needed because if there are '-' 
            instead of '/' the date gets messed up by one day beacuse of UTC*/
            const end = new Date((req.body.borrowEnd).replace(/-/g, '\/').replace(/T.+/, ''));
            let returned = null;
            if(req.body.returnDate != null || req.body.returnDate != undefined){//If there is a reuturn date to use
                returned = new Date((req.body.returnDate).replace(/-/g, '\/').replace(/T.+/, ''));
            }
            let fine = 0;
            let days = 0;

            //If there is a reuturn date to use
            if(returned != null){
                //If it was returned later than agreed, calculate fine
                if(returned > end){
                    //Calculate fine
                    days = parseInt((returned - end) / (1000 * 60 * 60 * 24));//(1000 * 60 * 60 * 24) to get days of difference
                    fine = days * 5
                }//If it was returned on time, the is no fine
            }

            //Set fine value in the JSON
            req.body.fine = fine;

            const borrowing = new Borrowing(req.body);

            await borrowing.save();

            console.log(borrowing);

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
            const borrowings = await Borrowing.find({}).populate('_idUser')
            if(!borrowings){
                return res.status(400).send({message: 'Could not find borrowings'})
            }
            return res.send(borrowings);
        }catch (e) {
            res.status(500).send({error: e.message});
        }
    },

    filterBorrowings : async (req, res) => {
        try{
            const borrowings = await Borrowing.find({}).populate('_idUser')
            /* That  replace(/-/g, '\/').replace(/T.+/, '') is not needed here because otherwise these dates become GMT -5 wich messes up the start date comparison*/
            const startDate = new Date((req.body.borrowStart))//Get start and end dates that want to be used as filters
            const endDate = new Date ((req.body.borrowEnd))
            if(!borrowings){
                return res.status(400).send({message: 'Could not find borrowings'})
            }
            const filteredBorrowings = []
            borrowings.forEach(borrowing => {
                /* That  replace(/-/g, '\/').replace(/T.+/, '') is not needed either here because on the dabate its GMT 0 which is fine for this comparison because the 
                   previous startDate and endDate dont need that .replace() either*/
                   const borrowStart = new Date(borrowing.borrowStart)
                   const borrowEnd = new Date(borrowing.borrowEnd)
                if((borrowStart >= startDate && borrowStart <= endDate) || 
                    (borrowEnd >= startDate && borrowEnd <= endDate)){//Filter, if the borrowing started and/or ended between the specified dates
                    filteredBorrowings.push(borrowing);//Add to filtered results
                    console.log(startDate)
                    console.log(endDate)
                    console.log(new Date(borrowing.borrowStart))
                    console.log(new Date(borrowing.borrowEnd))
                }
            });
            return res.send(filteredBorrowings);
        }catch (e) {
            res.status(500).send({error: e.message});
        }
    },

    updateBorrowing : async (req, res) => {
        try{
            //Get end date and actual return date 
            const end = new Date((req.body.borrowEnd).replace(/-/g, '\/').replace(/T.+/, ''));
            let returned = null;
            if(req.body.returnDate != null || req.body.returnDate != undefined){//If there is a reuturn date to use
                returned = new Date((req.body.returnDate).replace(/-/g, '\/').replace(/T.+/, ''));
            }
            let fine = 0;
            let days = 0;

            //If there is a reuturn date to use
            if(returned != null){
                //If it was returned later than agreed, calculate fine
                if(returned > end){
                    //Calculate fine
                    days = parseInt((returned - end) / (1000 * 60 * 60 * 24));//(1000 * 60 * 60 * 24) to get days of difference
                    fine = days * 5
                }//If it was returned on time, the is no fine
            }

            //Set fine value in the JSON
            req.body.fine = fine;
            const update = {
                _idUser: req.body._idUser,
                equipment : req.body.equipment,
                borrowStart : req.body.borrowStart,
                borrowEnd : req.body.borrowEnd,
                returnDate : req.body.returnDate,
                fine : fine,
                status : req.body.status
            };

            const borrowing = await Borrowing.findByIdAndUpdate(req.body._id, update, {new : true});//"{new: true}" returns the document as it is after the update

            console.log(borrowing);

            if (!borrowing){
                return res.status(400).send({message: 'Borrowing not found'})
            }

            return res.send(borrowing);
        }catch (e){
            res.status(500).send({error: e.message});
        }
    },

    deleteBorrowing : async (req, res) => {
        try{
            const borrowing = await Borrowing.findByIdAndDelete(req.body)//Body must contain id only

            if (!borrowing){
                return res.status(400).send({message: 'Borrowing not found'})
            }
            
            return res.send(borrowing);
        }catch (e){
            res.status(500).send({error: e.message});
        }
    }
}

module.exports = BorrowingsController