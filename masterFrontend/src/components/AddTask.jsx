import React, { useContext, useState } from "react";
import TaskContext from "../TaskContext";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTask, logout, masterUser } = useContext(TaskContext);
  return (
 
    
    <div >
 <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog p-5" role="document">
          <div className="modal-content">
            <div className="modal-header">
             
              <div className="text-center" style={{width:"100vw"}}>
                
                         <h1 className="modal-title" style={{ fonFamily: "Caveat", fontFamily: "Foldit" }}>
                           Task Master
                         </h1>
                         <p style={{ fontFamily: "Caveat", fontSize: "xx-large" }}>
                           {" "}
                           Your Daily Task Partner
                         </p>
                      
                     </div>
              <button type="button" className="close btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              
            </div>
            <div className="modal-body text-center">
            <img
            style={{ width: "200px" }}
            src="https://img.freepik.com/free-vector/hand-drawn-business-planning-with-task-list_23-2149164275.jpg"
            className="card-img-top"
            alt="..."
          />
        </div>
        <div className="card-body text-center">
          <h2  style={{ fontFamily: "Cinzel" }}>
            Welcome {masterUser && masterUser.name}
          </h2>

          <div className="p-3 ">
           
            <input
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              type="text"
              placeholder="Title"
              className="form-control text-center "
            />
            <br />
            
            <textarea
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              className="form-control text-center "
              placeholder="Description"
            ></textarea>
            <br />
           <div className="text-center">
           <button
              className="btn btn-primary"
              onClick={() => {
                addTask(title, description);
                setTitle("");
                setDescription("");
              }}
            >
              Add Task
            </button>
           </div>
          </div>
        </div>
      </div>
            </div>
          
          </div>
        </div>
      
  );
}
