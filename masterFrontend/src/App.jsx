import { useEffect, useState } from "react"
import {Routes,Route, useNavigate} from "react-router-dom"
import TaskContext from "./TaskContext";
import Login from "./components/Login"
import Home from "./components/Home"
import Signup from "./components/Signup"
import ForgetPassword from "./components/ForgetPassword"
import ForgetPasswordInput from "./components/ForgetPasswordInput"
import "./App.css"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function App() {
const [masterUser,setMasterUser]=useState(null);
const [masterTask,setMasterTask]=useState([]);
const navigate=useNavigate();

const login=(email,password)=>{
     fetch("http://localhost:3001/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        email,
        password
      }),
     })
     .then((res)=>res.json())
     .then((data)=>{
     
      if(data.success==false){
        toast.error(data.message);
      }else{
        setMasterUser(data);
        localStorage.setItem("userdata",JSON.stringify(data));
        navigate("/home")
        toast.success("Logged in successful")
      }
     })
     .catch((err) => {
      console.log("Error", err.messsage);
    });
}

//step 2 signup

const signup=(email,password,name)=>{
  fetch("http://localhost:3001/auth/signup",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body : JSON.stringify({
      email,
      password,
      name
    }),
  })
  .then((res)=>res.json())
  .then((data)=>{
     if(data.success==true){
      alert(data.message);
      navigate("/");
     }else{
      alert(data.message);
     }
  })
  .catch((err) => console.log("Error ", err.message));
}

const addTask = (title, description) => {
  fetch("http://localhost:3001/task/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: masterUser.token,
    },
    body: JSON.stringify({
      title,
      description,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success == false) {
        toast.error("Error While Adding Task" + data.message);
      } else {
       toast.success("Task Added")
        fetchAllTasks();
       
      }
    })
    .catch((err) => console.log("Error ", err.message));
};
const fetchAllTasks=()=>{
  if (!masterUser) return;
  fetch("http://localhost:3001/task/get",{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      Authorization: masterUser.token,

    },
   
})
.then((res)=>res.json())
.then((data)=>{
  if(data.success==false){
    alert("Error while fetching your Tasks"+data.message);
  }else{
   
    setMasterTask(data.tasks)
  }
})
.catch((err) => console.log("Error ", err.message));
  };

const deleteTasks=(taskId)=>{
  let userAction = confirm("Are you sure ? You want to delte this Task?");
  if(userAction == false){
    return;
  }
  fetch(`http://localhost:3001/task/delete/${taskId}`,{
    method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: masterUser.token,
      },
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.success == false) {
      alert("Error while Deleting Task " + data.message);
    } else {
    toast.success("Task Deleted")
      fetchAllTasks();
    }
  })
  .catch((err) => console.log("Error ", err.message));
}
const markAsComplete = (taskId) => {
  fetch(`http://localhost:3001/task/mark-complete/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: masterUser.token,
    },
    body: JSON.stringify({ completed: true }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success == false) {
        alert("Error while Deleting Task " + data.message);
      } else {
        // if Task is deleted successfully
        toast.success("Task Completed")
        fetchAllTasks();
      }
    })
    .catch((err) => console.log("Error ", err.message));
};

useEffect(()=>{
  if(localStorage.getItem("userdata")){
    setMasterUser(JSON.parse(localStorage.getItem("userdata")));
    navigate("/home")
  }
},[])

const logout=()=>{
  navigate("/");
  localStorage.removeItem("userdata");
  setMasterUser(null);
}
  return (
    <TaskContext.Provider
      value={{
        login,
        signup,
        masterUser,
        addTask,
        fetchAllTasks,
        masterTask,
        deleteTasks,
        markAsComplete,
        logout,
      }}
      >
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/forget-password" element={<ForgetPassword/>}/>
          <Route 
          path="/forget-password/set-password/:token" element={<ForgetPasswordInput/>}
          />
        </Routes>

    </TaskContext.Provider>
  )
}
