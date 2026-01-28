const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB connection...');
console.log('Connection string:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        console.log('Database:', mongoose.connection.name);
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:');
        console.error('Error:', err.message);
        console.error('\nPlease check:');
        console.error('1. MongoDB is running (for local) or');
        console.error('2. Connection string is correct (for Atlas)');
        process.exit(1);
    });
