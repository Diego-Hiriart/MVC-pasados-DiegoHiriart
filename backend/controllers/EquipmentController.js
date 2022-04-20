const User = require('../models/Equipment')

const EquipmentController = {
    createEquipment: async (req, res) => {
        try{
            console.log(req.body);

            const equipment = new Equipment(req.body);
            await equipment.save();

            if (!equipment){
                return res.status(400).send({message: 'Equipment not found'})
            }

            return res.send(equipment);
        }catch (e) {
            res.status(500).send({error: e.message});
        }
    },

    getAllEquipment: async (req, res) => {
        try{
            const equipment = await Equipment.find({}).populate('idUser')
            if(!equipment){
                return res.status(400).send({message: 'Could not find borrowings'})
            }
            return res.send(equipment);
        }catch (e) {
            res.status(500).send({error: e.message});
        }
    }
}

module.exports = EquipmentController