import { useContext, useState } from "react"
import TaskContext from "../TaskContext";
import { Link } from "react-router-dom";

export default function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const {login} = useContext(TaskContext);
    
    const handleSubmit =(e)=>{
           e.preventDefault();
           login(email,password);
    };
  return (
   
    <div style={{height:"100vh"}}>
    <h1 className="text-center pt-5" style={{fonFamily: 'Caveat',
fontFamily: 'Foldit'}}>Task Master</h1>
      <p className="text-center" style={{fontFamily: 'Caveat' ,fontSize:"xx-large"}}> Your Daily Task Partner</p>
    <div className="d-flex justify-content-center ">
      
      <div className="login-form border rounded mt-2 p-2 " style={{width:"25rem"}}  >
    <form onSubmit={handleSubmit}>
      <div  className="text-center" style={{marginTop:"-2rem ",}}><img width="100px" style={{borderRadius:"50%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiaEbB4CHlWQNXTCa6EO4FeYfvmK2U1kcggBoscy-71-fDV8dy69xCADf8nXeE1tywQAQ&usqp=CAU"/></div>
    <h2 className="text-center" style={{fontFamily: 'Cantora One' }}>Login Now</h2>
      <div className="mb-3 " >
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
         type="email"
         placeholder="Enter Your Email"
         onChange={(e) => setEmail(e.currentTarget.value)}
          className="form-control text-center "
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control text-center"
          id="exampleInputPassword1"
          placeholder="Enter Your password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
     <div className="text-center">
     <Link to="/forget-password">Forget Password ?</Link><br/>
            <Link to="/signup">Dont have an account ?signup</Link><br/>
     </div>
      
     <div className="d-flex justify-content-center mt-3"> <button type="submit" value="Login"className="btn btn-primary mb-3">
        Submit
      </button></div>
    </form>
    </div>
     
    </div>
    </div>
  
    
  )
}
