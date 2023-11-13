import React, { useContext, useEffect } from "react";
import TaskContext from "../TaskContext";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
export default function RightSidebar() {
  const { masterTask, masterUser, fetchAllTasks, logout } =
    useContext(TaskContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!masterUser) {
      navigate("/");
    } else {
      fetchAllTasks();
    }
  }, [fetchAllTasks]);

  return (
    <div>
      <div
        className="row  "
        style={{ width: "100vw", height: "100vh", overflow: "auto" }}
      >
        <div className="text-center" style={{ width: "100vw" }}>
          <h1
            className="modal-title"
            style={{ fonFamily: "Caveat", fontFamily: "Foldit" }}
          >
            Task Master
          </h1>
          <p style={{ fontFamily: "Caveat", fontSize: "xx-large" }}>
            {" "}
            Your Daily Task Partner
          </p>
        </div>

        <div className="col-12 d-flex px-4">
         <div className="d-column">
         <div>
            <h2 className="text-center " style={{ fontFamily: "Cantora One" }}>
              YOU HAVE TO DO THESE TASKS
            </h2>
          </div>{" "}
          <div className="text-center">
            <button className="btn btn-warning" onClick={logout}>
              Logout
            </button>
          </div>
         </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {masterTask.map((item, index) => (
              <TaskItem
                id={item._id}
                title={item.title}
                description={item.description}
                completed={item.completed}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-end"
        style={{ bottom: "2rem", position: "fixed" }}
      >
        <button
          style={{ marginLeft: "10vw" }}
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          +
        </button>
        <AddTask />
      </div>
    </div>
  );
}
