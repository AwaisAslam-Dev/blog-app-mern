import mongoose from "mongoose";
const dbconnect = async (req,res)=>{
    try {
        mongoose.connect(process.env.DB_URL).then(()=>{
            console.log("connected successfully");
            
        })
    } catch (error) {
        console.log(error);
        
    }
}
export default dbconnect;