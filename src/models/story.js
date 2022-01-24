const mongoose = require('mongoose')
const validator = require('validator')

const storySchema = new mongoose.Schema({
    description : {
        type: String,
        trim : true,
    }, 
    likes : {
        type : Number,
        default : 0,
    },
    comments: [{
        comment : {
            type: String
        },
        author : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref: 'User'
        }
    }],
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    }
}, {    
    timestamps: true
})
const Story = mongoose.model('Story', storySchema)

module.exports = Story


