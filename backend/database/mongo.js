const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/MVCPasados', {
    useNewUrlParser : true,
    useUnifiedTopology :  true,
    //useFindAndModify : true,
    //useCreateIndex: true
});