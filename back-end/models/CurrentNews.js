import mongoose from "mongoose";

const currentNews=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const current=mongoose.model('Currentnews',currentNews)

export default current;