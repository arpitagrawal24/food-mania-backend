require('dotenv').config();
const mongoose = require('mongoose');

const connect = async() => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.log(`not connected ${error}`);
    }
}

module.exports = connect;