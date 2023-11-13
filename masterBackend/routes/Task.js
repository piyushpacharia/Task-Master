const express = require("express");
const router = express.Router();

const {addTask,deleteTask,markAsComplete,readTask} =require("../controllers/Task")


router.post("/add",addTask);

router.get("/get",readTask);

router.put("/mark-complete/:taskId",markAsComplete);

router.delete("/delete/:taskId",deleteTask);

module.exports = router;