const mongoose = require('mongoose');
const validator = require('validator');

const commentSchema = new mongoose.Schema({
    comment : {
        type: String
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    storyId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Story'
    }
}, {    
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
