const express = new require("express");
const router = new express.Router();
const Task = require("../models/task");

router.get("/tasks",async (req,res)=>{

    try {
        console.log("in get tasks");
        const result = await Task.find();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
    //res.send("Hi there");
});
router.get("/tasks/:id",async (req,res)=>{
    const _id = req.params.id;
    try {
        const result = await Task.findById(_id);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
    //res.send("Hi there");
});
router.post("/task",async (req,res)=>{
    const task = new Task(req.body);
    try {
        const result = await task.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch("/tasks/:id",async (req,res)=>{
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["type","description","completed"];
    const isValidUpdation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })
    if(!isValidUpdation){
        return res.status(400).send({"Error": "Invalid Updates"})
    }
    try {
        const task = await Task.findById(_id);
        updates.forEach((update)=>{
            task[update] = req.body[update];
        });
        await task.save();
       // const task = await Task.findByIdAndUpdate(_id,req.body,{new:true , runValidators:true});
        if(!task){
            res.status(400).send();
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
    //res.send("Hi there");
});

router.delete("/tasks/:id",async (req,res)=>{
    const _id = req.params.id;
    try {
        const result = await Task.findByIdAndDelete(_id);
        if(!result){
            res.status(200).send({"result":"Task not present"});
        }
        res.status(200).send({"result":"Task deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
    //res.send("Hi there");
});

module.exports = router;