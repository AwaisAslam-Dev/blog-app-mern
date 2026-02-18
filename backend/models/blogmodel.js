import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    thumbnail:{
        type:String,
       required: true
    },
    heading:{
        type:String,
        required: true
    },
    text:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true
    }
})
export default mongoose.model("blogs",blogSchema);