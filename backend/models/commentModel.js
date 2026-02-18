import mongoose from 'mongoose'
const commentScehma = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blogs",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    username:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
export default mongoose.model("comments",commentScehma)