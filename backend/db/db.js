import e from 'express';
import mongoose from 'mongoose';

const connectDatabase =async () =>{
try {
    const con = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected : ${con.connection.host}`);
} catch (error) {
    console.log(`Error connecting to database: ${error.message}`);
    process.exit(1);
}
}

export default connectDatabase;