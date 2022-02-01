const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Story = require("./story");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        default: "Default Name",
        trim: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        default: "default@gmail.com",
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email.");
            }
        }
    },
    password:{
        type:String,
        default: "admin@123",
        trim: true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password cannot contain password");
            }
        },
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],
    avatar:{
        type: Buffer
    }
});
userSchema.virtual("stories",{
    ref: "Story",
    localField: "_id",
    foreignField: "author"
})

userSchema.methods.toJSON = function (){
    const user = this
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    return userObj;
}
userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.API_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error("Email not present in DB");
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error("Incorrect Password");
        }
        
        return user;
    } catch (error) {
        console.log(error.message);
        return null;
    }
    
}


userSchema.pre("save",async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})
userSchema.pre("remove",async function(next){
    const user = this;
    const result = await Story.deleteMany({author:user._id});
    console.log(result);
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User