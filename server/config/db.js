import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri || uri.trim() === '') {
    // Disable command buffering so queries fail immediately instead of hanging 10 seconds
    mongoose.set('bufferCommands', false);
    console.warn('⚠️  MONGO_URI is not set in server/.env. Running in offline/development mode.');
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    mongoose.set('bufferCommands', false);
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️  Server will continue running. Update server/.env with a valid MongoDB Atlas connection string.');
    return null;
  }
};

export default connectDB;
