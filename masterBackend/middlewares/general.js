const jwt =require("jsonwebtoken");

function checkBodyParams(req,res,next){
    const {name,email,password}=req.body;
    if(!email || !password || !name)
    return res.json({success:false,message:"invalid data"});
    if(password.length < 6)
    return res.json({success:false,message:"Weak password"});

    if(name.length <=1)
    return res.json({success:false,message:"name is to short"});

    if(email.length < 6)
    return res.json({success:false,message:"Wrong Email"});

    next();


}

function isLoggedIn(req,res,next){
    const token =req.headers.authorization;

    try{
        const data =jwt.verify(token,"12345")
        console.log(data);
        req.tokenData=data;
        return next();
    }
    catch(err){
        return res.json({success:false,message:err.message});
    }
}
module.exports={checkBodyParams,isLoggedIn}