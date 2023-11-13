import { useContext } from "react";
import TaskContext from "../TaskContext";

export default function TaskItem({ title, description, completed, id }) {
  const { deleteTasks, markAsComplete } = useContext(TaskContext);

  return (
    <div
      className="border rounded text-center p-3 task-box"
      style={{ minWidth: "15rem", maxWidth: "15rem", height: "40vh" ,overflow:"auto"}}
    >
      <h3 style={{ fontFamily: "Almendra", fontSize: "xx-large" }}>{title}</h3>
      <p style={{ fontFamily: "Charmonman", fontSize: "x-large" }}>
        {description}
      </p>
      <p style={{ fontFamily: "Cinzel",fontSize:"large" }} >Status: {completed ? "Completed" : "Pending"}</p>

      <div className="d-flex gap-2 justify-content-center">
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteTasks(id);
          }}
        >
          Delete <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        {!completed && (
          <button
            className="btn btn-success"
            onClick={() => markAsComplete(id)}
          >
            Complete <i className="fa fa-check" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </div>
  );
}
