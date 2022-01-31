const Story = require("../models/story");
const User = require("../models/user");
const Comment = require("../models/comment");


async function createStory(req,successData,errorData){
    try {
        const story = new Story ({
            ...req.body,
            author :req.user._id
        })
        await story.save()
        return successData(story);
    } catch (error) {
       return errorData({"error":error});
    }
}
async function getAllStories(req,successData,errorData){
    try {
        const allStories = await Story.find();
        return successData(allStories);
    } catch (error) {
       return errorData({"error":error});
    }
}
async function getUserStories(req,successData,errorData){
    try {
        const match = {};
        const sort = {};
        const user = await User.findById(req.user._id);
        match.description = "I am SpiderMan, the oldest Avenger";
        if(req.query.sortBy){
            const parts = req.query.sortBy.split(":");
            sort[parts[0]] = parts[1]==="desc"?-1:1;
        }
        await user.populate({
            path: "stories",
            //match
            options: {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        console.log(user.stories);
        if(!user.stories){
            return successData("Story not found");
        }
        return successData(user.stories);
    } catch (error) {
       return errorData({"error":error});
    }
}

async function getStory(req,successData,errorData){
    try {
        const _id = req.params.id;
        const story = await Story.findOne({_id, author : req.user._id});
        if(!story){
            return successData("Story not found");
        }
        return successData(story);
    } catch (error) {
       return errorData({"error":error});
    }
}
async function updateStory(req,successData,errorData){
    try {
        const _id = req.params.id;
        const updates = Object.keys(req.body);
        const allowedUpdates = ["description"];
        const isValidUpdation = updates.every((update)=>{
            return allowedUpdates.includes(update);
        })
        if(!isValidUpdation){
            return errorData({"Error": "Invalid Updates"})
        }
        const story = await Story.findOne({_id, author: req.user._id});
        if(!story){
            throw new Error();
        }
        updates.forEach((update)=>{
            story[update] = req.body[update];
        });
        await story.save();      
        return successData(story);
    } catch (error) {
       return errorData({"error":error});
    }
}
async function addComment(req,successData,errorData){
    try {
        const _id = req.params.id;
        const story = await Story.findById(_id);    
        if(!story){
            throw new Error("Story not found");
        }
        const updates = Object.keys(req.body);
        const allowedUpdates = ["comment"];
        const isValidUpdation = updates.every((update)=>{
            return allowedUpdates.includes(update);
        })
        if(!isValidUpdation){
            return errorData({"Error": "Invalid Updates"})
        } 
        const newComment = new Comment({
            ...req.body,
            author: req.user._id,
            storyId: _id
        });
        await newComment.save();  
        await story.populate("allComments").execPopulate();
        console.log(story.allComments);
        return successData(story.allComments);
    } catch (error) {
       return errorData({"error":error.message});
    }
}
async function toggleLike(req,successData,errorData){
    try {
        let result = "";
        const _id = req.params.id;
        const story = await Story.findById(_id);
        if(!story){
            throw new Error();
        }
        const like = {
            givenBy: req.user._id
        }
        var found = await story.likes.find((like,index)=>{
            if(like.givenBy.equals(req.user._id)){
                story.likes.splice(index,1);
                return true;
            }
        });
        if(!found){
            story.likes = story.likes.concat(like);
            result = "Added like";   
        }else{
            result = "Removed like";
        }
        await story.save();             
        return successData({result});
    } catch (error) {
       return errorData({"error":error});
    }
}
async function deleteStory(req,successData,errorData){
    try {
        const _id = req.params.id;
        const result = await Story.findOneAndDelete({_id, author: req.user._id});
        if(!result){
            return successData({"result":"story not present"});
        }
        return successData({"result":"Story deleted"});

    } catch (error) {
       return errorData({"error":error});
    }
}
exports.createStory = createStory;
exports.getAllStories = getAllStories;
exports.getUserStories = getUserStories;
exports.getStory = getStory;
exports.updateStory = updateStory;
exports.addComment = addComment;
exports.toggleLike = toggleLike;
exports.deleteStory = deleteStory;