const mongoose =require("mongoose");

const taskSchema = new mongoose.Schema({
    title:String,
    description:String,
    completed:{
        type:Boolean,
        default:false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"masterUser",
        require:true,
    }
})

module.exports = mongoose.model("taskTodo" , taskSchema);