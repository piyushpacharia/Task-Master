import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPasswordInput() {
    const [password,setPassword]=useState("")
    const [password2,setPassword2]=useState("")
    const {token} =useParams();

    const navigate=useNavigate();
    const updatePassword=()=>{
        if(password != password2){
            alert("password are not matching")
            return;
        }
        fetch(`http://localhost:3001/auth/handle-update-password`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({password,token}),
        })
        .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success == false) {
          toast.error(data.message);
        } else {
          // if Task is Updated successfully
          toast.success("Password Updated Successfully")
          navigate("/");
        }
      })
      .catch((err) => console.log("Error ", err.message));

    }
  return (
    <div  style={{height:"100vh"}} className="d-flex justify-content-center mt-5">
       <div className="border  rounded p-3 mt-5" style={{width:"30vw",height:"55vh"}}>
      <div  className="text-center" style={{marginTop:"-2rem ",}}><img width="100px" style={{borderRadius:"50%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiaEbB4CHlWQNXTCa6EO4FeYfvmK2U1kcggBoscy-71-fDV8dy69xCADf8nXeE1tywQAQ&usqp=CAU"/></div>
      <h3 className="text-center"  style={{fontFamily: 'Cantora One' }}> Update Password</h3>
     <div >
     <label htmlFor="exampleInputPassword1" className="form-label">
          New Password
        </label>
      <input
      
        onChange={(e) => setPassword(e.currentTarget.value)}
        className="form-control"
        type="password"
          id="exampleInputPassword1"
        placeholder="Enter New Password"
      />
      <br />
      <label htmlFor="exampleInputPassword2" className="form-label">
          Confirm Password
        </label>
      <input
      
        onChange={(e) => setPassword2(e.currentTarget.value)}
        className="form-control"
        type="password"
          id="exampleInputPassword2"
        placeholder="Enter New Password"
      />
      <br />
     <div className="text-center">
     <button className="btn btn-primary " onClick={updatePassword}>Update Password</button>
     </div>
     </div>
    </div>
    </div>
  )
}

