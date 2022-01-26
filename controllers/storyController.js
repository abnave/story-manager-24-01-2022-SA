const storyServices = require("../services/storyServices");

function createStory(req,res){
    try {
        storyServices.createStory(req,(successData)=>{
            res.status(201).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
        
    } catch (error) {
        res.status(500).send({"error":"Bad request"});
    }
}
function getAllStories(req,res){
    try {
        storyServices.getAllStories(req,(successData)=>{
            res.status(201).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
        
    } catch (error) {
        res.status(500).send({"error":"Bad request"});
    }
}
function getUserStories(req,res){
    try {
        storyServices.getUserStories(req,(successData)=>{
            res.status(201).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
        
    } catch (error) {
        res.status(500).send({"error":"Bad request"});
    }
}
function getStory(req,res){
    try {
        storyServices.getStory(req,(successData)=>{
            res.status(201).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
        
    } catch (error) {
        res.status(500).send({"error":"Bad request"});
    }
}
function updateStory(req,res){
    try {
        storyServices.updateStory(req,(successData)=>{
            res.status(201).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
        
    } catch (error) {
        res.status(500).send({"error":"Bad request"});
    }
}
function addComment(req,res){
    try {
        storyServices.addComment(req,(successData)=>{
            res.status(201).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
        
    } catch (error) {
        res.status(500).send({"error":"Bad request"});
    }
}
function deleteStory(req,res){
    try {
        storyServices.deleteStory(req,(successData)=>{
            res.status(201).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
        
    } catch (error) {
        res.status(500).send({"error":"Bad request"});
    }
}



module.exports.createStory = createStory;
module.exports.getAllStories = getAllStories;
module.exports.getUserStories = getUserStories;
module.exports.getStory = getStory;
module.exports.updateStory = updateStory;
module.exports.addComment = addComment;
module.exports.deleteStory = deleteStory;
