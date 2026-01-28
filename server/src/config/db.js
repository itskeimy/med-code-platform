const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
    try {
        // Для разработки: используем in-memory MongoDB (не требует установки!)
        if (process.env.NODE_ENV !== 'production') {
            console.log('🚀 Starting in-memory MongoDB for development...');
            mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();

            await mongoose.connect(mongoUri);
            console.log('✅ In-Memory MongoDB Connected!');
            console.log('📍 Database URI:', mongoUri);
        } else {
            // Для продакшена: используем реальную MongoDB
            await mongoose.connect(process.env.MONGO_URI);
            console.log('✅ MongoDB Connected...');
        }
    } catch (err) {
        console.error('❌ Database Connection Error:', err.message);
        process.exit(1);
    }
};

// Функция для остановки in-memory сервера
const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        if (mongoServer) {
            await mongoServer.stop();
            console.log('In-Memory MongoDB stopped');
        }
    } catch (err) {
        console.error('Error disconnecting:', err.message);
    }
};

module.exports = { connectDB, disconnectDB };
