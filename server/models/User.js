const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB, { useUnifiedTopology: true, useNewUrlParser: true });
const DB = mongoose.connection;
DB.on('error', console.error.bind(console, 'mongo connection error'));


let userSchema = new Schema({
        email: { type: String, required: true },
        password: {type: String, required: true }
})


 module.exports = mongoose.model('User', userSchema);