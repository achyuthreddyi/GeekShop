import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () =>{
    // console.log("inside the db file", process.env.MONGO_URI);
    // const deleteme = 'mongodb+srv://achyuth:achyuth@demo.xlnni.mongodb.net/geekshop?retryWrites=true&w=majority'
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology : true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`mongo db connected:${conn.connection.host}`.cyan.underline);
        
    } catch (error) {
        console.error(`error${error.message}`.red.underline.bold);
        // process.exit(1)       
    }
    // next()
}

export default connectDB