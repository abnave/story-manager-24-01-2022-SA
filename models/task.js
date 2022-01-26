const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const taskSchema = new mongoose.Schema({
    type:{
        type:String,
        default: "DEFAULT",
        uppercase: true,
        trim: true,
        minlength:4,
        maxlength:15,
        required: true
    },
    description:{
        type:String,
        required: true,
        trim: true,
        default: "This is a default task",
        validate(value){
            if(value.length <10){
                throw new Error("Task tooo small.");
            }
        }
    },
    completed:{
        type:Boolean,
        default: false,
        required: true
    }
});

taskSchema.pre("save",async function(next){
    const user = this;
    // if(user.isModified('password')){
    //     user.password = await bcrypt.hash(user.password,8);
    // }
    console.log("Just before saving");
    next();
})

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;