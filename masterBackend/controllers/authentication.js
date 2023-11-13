const nodemailer =require("nodemailer")
const masterUser =require("../models/masterUser")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")

const signUp =(req,res)=>{
    const {name , email ,password}=req.body;

    masterUser.findOne({email:req.body.email})
    .then((user)=>{
        if(user){
            return res.json({success:false,message:"Email already in use"});
        }
        bcrypt.hash(password,10,(err,hash)=>{
            if(err){
                return res.json({success:false,message:err.message});
            }
    masterUser.create({name:name,email:email,password:hash})
            .then((user)=>{
                const token =jwt.sign({_id:user._id},"12345",)
            
            const transporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"ppachariya007@gmail.com",
     pass:"sqyt bnbt pdwf whnc",
                }
            })
            const mailOptions={
                to:user.email,
                from:"ppachariya007@gmail.com",
                subject:"Activate Your Task Master Account",
                html:`<p> Hey ${user.name}, Welcome in Todo App. Your Account has been created. In order to use your account you 
                have to verify your email by clicking on following link </p>
                <a style="padding:10px; background-color: dodgerblue" href="http://localhost:3001/auth/activate-account/${token}"> Activate Account </a>
                `,
            };
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    return res.json({success:false,message:"Error While Sending Email"})
                }
                else{
                    return res.json({success:true,message:"An invitation link has been sent on your email to activate account"})
                }
            });
        })
        .catch((err)=>res.json({success:false,message:err.message}))

    });
})
.catch((err)=>res.json({success:false,message:err.message}));

}
const login =(req,res)=>{
    const {email,password}=req.body;

    masterUser.findOne({email:email})
    .then((user)=>{
        if(!user){
            return res.json({success:false,message:"Email not found"});
        }
        //checking email verified
if(user.emailVerified==false){
return res.json({
    success:false,
    message:"Please Verify Your Account by the link sent on mail",
});
    }
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result==true){
                const token=jwt.sign({name:user.name,email:user.email,_id:user._id},"12345",
                );
                return res.json({success:true,message:"Logged in successful",
            token:token,
        name:user.name,
    });
            }
            else{
                return res.json({success:false,message:"Wrong Password"});
            }
        })
    })
    .catch((err)=>res.json({success:false,message:err.message}));
}
const activateAccount=(req,res)=>{
    const token=req.params.token;

    try{
        const data = jwt.verify(token,"12345");

        masterUser.findByIdAndUpdate(data._id,{
            emailVerified:true
        })
        // .then(()=>res.redirect("http://localhost:5173/"))
        .then(()=>{
            return res.json({success:true})
        })
        .catch(() =>
        res.json({
          success: false,
          message: "Please Try Again! We are sorry for Inconvenience!",
        })
      );
    }
    catch (err) {
        return res.json({ success: false, message: "Link has Been Expired!" });
}
}

const sendForgetPasswordLink =(req,res)=>{
    const{email}=req.body;

    masterUser.findOne({email})
    .then((user)=>{
        if(!user)
            return res.json({success:false,message:"No Account found with this email"
        })
        let token =jwt.sign({_id:user._id},
            "forgetPasswordToken12345",);

            let newToken1=token.replace(".","--")
            let newToken2=newToken1.replace(".","--")

            var transporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"ppachariya007@gmail.com",
                    pass:"sqyt bnbt pdwf whnc",
                }
            })
            var mailOptions={
                from:"ppachariya007@gmail.com",
                to:user.email,
                subject:"Activate Your Task Master Account ",
                html:`<p>hello ${user.name},click on the following link to update your password</p>

                <a style="padding:10px; background-color: dodgerblue" href="http://localhost:5173/forget-password/set-password/${newToken2}"> Update Password </a>

                <p> If it's not done by you, Just igngone it </p>`
            }
             transporter.sendMail(mailOptions,function(error , info){
                if(error){
                    return res.json({success:false,message:"Error occured while forgetting password"})
                }
                else{
                    return res.json({
                        success:true,
                        message: "An Account activation link has been sent on given email.",
                    });
                }
             });
    })
    .catch((err)=>res.json({success:false,message:err.message}));
};

const handlePasswordUpdateDetails =(req,res)=>{
    const {token ,password}=req.body;

    let newToken1=token.replace("--",".");
    let newToken2=newToken1.replace("--",".");
    
    //verify the token 
    try{
        const data=jwt.verify(newToken2,"forgetPasswordToken12345");
        //hash the pasword
        bcrypt.hash(password,10,(err,hash)=>{
            if(err){
                return res.json({success:false,message:err.message});
            }
            masterUser.findByIdAndUpdate(data._id,{
                password:hash})
                .then(()=>res.json({success:true,message:"password updated"}))
                .catch((err)=>res.json({success:false,message:err.message}));
        });
    }catch(err){
        return res.json({success:false,message:err.message});
    }
};
module.exports={signUp,login,activateAccount,handlePasswordUpdateDetails,sendForgetPasswordLink}