const Tasks =require("../models/Task")

const addTask=(req,res)=>{
    const {title,description}=req.body;
    if(title == "" && description ==""){
        return res.json({success:false,message:" Cannot Be Empty"})
    }
    else{
        Tasks.create({title,description,createdBy:req.tokenData._id})
    
    .then(()=>res.json({success:true,message:"Task added"}))
    .catch((err)=>res.json({success:false,message:err.message}));
    }
 
}
const readTask=(req,res)=>{
    Tasks.find({createdBy:req.tokenData._id})
    .then((task)=>{
        console.log(task);
        return res.json({success:true,tasks:task});
    })
    .catch((err)=> res.json({success:false,message:err.message}))
}

const markAsComplete=(req,res)=>{
    const {completed}=req.body;
    const taskId=req.params.taskId;

    Tasks.findOneAndUpdate(
        {_id:taskId,createdBy:req.tokenData._id},
        {completed}
    )
    .then((doc)=>{
        if(doc){
            return res.json({success:true,data:"Task Updated"});
        }
        else{
            return res.json({success:false,data:"No Task found"})
        }
    }).catch((err)=>res.json({success:false,data:err.message}))
}
const deleteTask =(req,res)=>{
    Tasks.findOneAndDelete({
        _id:req.params.taskId,
        createdBy:req.tokenData._id,

    })
    .then((doc)=>{
        if(doc){
            return res.json({success:true,data:"Task Deleted"});
        }
        else{
            return res.json({success:false,data:"No Task found"});
        }
    })
    .catch((err)=>res.json({success:false,data:err.message}));
}

module.exports={addTask,deleteTask,markAsComplete,readTask}