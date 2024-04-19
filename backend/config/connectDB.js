import mongoose from 'mongoose';


export default async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL);       
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}