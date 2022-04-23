const User = require('../models/User')

const UsersController = {
    createUser: async (req, res) => {
        try{
            console.log(req.body);

            const user = new User(req.body);
            await user.save();

            if (!user){
                return res.status(400).send({message: 'User not found'})
            }

            return res.send(user);
        }catch (e) {
            res.status(500).send({error: e.message});
        }
    },

    getAllUsers: async (req, res) => {
        try{
            const users = await User.find()
            if(!users){
                return res.status(400).send({message: 'Could not find users'})
            }
            return res.send(users);
        }catch (e) {
            res.status(500).send({error: e.message});
        }
    },

    updateUser : async (req, res) => {
        try{
            const update = {
                userId : req.body.userId,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                phone : req.body.phone,
                email : req.body.email
            };

            const user = await User.findByIdAndUpdate(req.body._id, update, {new : true});//"{new: true}" returns the document as it is after the update

            console.log(user);

            if (!user){
                return res.status(400).send({message: 'User not found'})
            }

            return res.send(user);
        }catch (e){
            res.status(500).send({error: e.message});
        }
    },

    deleteUser : async (req, res) => {
        try{
            const user = await User.findByIdAndDelete(req.body)//Body must contain id only

            if (!user){
                return res.status(400).send({message: 'User not found'})
            }
            
            return res.send(user);
        }catch (e){
            res.status(500).send({error: e.message});
        }
    }
}

module.exports = UsersController