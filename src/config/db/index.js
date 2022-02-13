const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://LamQuyet:lamquyet9x@cluster0.2i9lp.mongodb.net/BBQ');
        console.log("Connected")
    } catch (error) {
        console.log('Failed')
    }

}

module.exports = { connect }