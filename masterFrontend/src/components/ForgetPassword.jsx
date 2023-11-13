import { useState } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function ForgetPassword() {
    const [email,setEmail]=useState("")
    const ForgetPassword=()=>{
        fetch(`http://localhost:3001/auth/forget-password`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:email}),
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.success==false){
                toast.error(data.message);
            }else{
                toast.success(data.message);
            }
        })
        .catch((err) => console.log("Error ", err.message));
    }
  return (
    <div style={{height:"100vh"}}>
       <div className="text-center mt-5">
       <h1 style={{fonFamily: 'Caveat',
fontFamily: 'Foldit'}}>Task Master</h1>
      <p style={{fontFamily: 'Caveat' ,fontSize:"xx-large"}}> Your Daily Task Partner</p>
       </div>
    <div className="d-flex justify-content-center">
      
    <div className="border  rounded p-3 mt-5">
        
        <div className="text-center" style={{marginTop:"-2rem "}}><img width="100px" style={{borderRadius:"50%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiaEbB4CHlWQNXTCa6EO4FeYfvmK2U1kcggBoscy-71-fDV8dy69xCADf8nXeE1tywQAQ&usqp=CAU"/></div>
       <h3 className="text-center" style={{fontFamily: 'Cantora One' }}>Forget your Password</h3>
     <p>Enter Email associated with your account ?</p>
     <input type="email" onChange={(e)=>setEmail(e.currentTarget.value)}
     className="form-control text-center "
     id="exampleInputEmail1"
     aria-describedby="emailHelp" placeholder="Enter Your email" /><br/>
     <div className="text-center">
     <Link to="/">Back to login</Link>
     </div>
    <div className="text-center">
    <button className="btn btn-primary" onClick={ForgetPassword}>Forget Password</button><br/>
    </div>
   </div>
    </div>
    </div>
  )
}
