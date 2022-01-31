const mongoose = require('mongoose')
const validator = require('validator')

const storySchema = new mongoose.Schema({
    description : {
        type: String,
        trim : true,
    }, 
    likes : [{
        givenBy : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref: 'User'
        }
    }],
    // comments: [{
    //     commentId : {
    //         type: mongoose.Schema.Types.ObjectId
    //     }
    // }],
    // comments: [{
    //     comment : {
    //         type: String
    //     },
    //     author : {
    //         type : mongoose.Schema.Types.ObjectId,
    //         required : true,
    //         ref: 'User'
    //     }
    // }],
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    }
}, {    
    timestamps: true
})

storySchema.virtual('allComments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'storyId',
});


const Story = mongoose.model('Story', storySchema)

module.exports = Story


