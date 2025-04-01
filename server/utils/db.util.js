import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Please make sure:');
    console.error('1. MongoDB is running on your system');
    console.error('2. MONGO_URI is properly set in your .env file');
    console.error('3. The MongoDB connection string is valid');
    process.exit(1);
  }
};

export default connectDB;
