const mongoUri = process.env.MONGO_URI;
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('data base has been connected');
      return;
    } else {
      await mongoose.connect(mongoUri);
      console.log('data base connected');
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
