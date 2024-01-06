import mongoose from "mongoose";


const connectDb = async() => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB IS CONNECTED ON HOST -> ", connection.host);
    } catch (error) {
        console.log("mongo db CONNECTION IS FAILED  !!! " ,error);
    }
}

export default connectDb;