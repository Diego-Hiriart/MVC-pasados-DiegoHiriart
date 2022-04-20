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
    }
}

module.exports = UsersController