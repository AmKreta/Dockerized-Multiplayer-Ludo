const mongoose = require('mongoose');

const connectDB = async (dbname) => {
    let mongoURL = 'mongodb://mongodb:27017';
    try {
        let conn = await mongoose.connect(`${mongoURL}/${dbname}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.table({
            mongoDB: 'connected',
            host: conn.connection.host,
            name: conn.connection.name,
        });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;