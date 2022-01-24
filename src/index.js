const express = require("express");
require("./db/mongoose");
const Task = require("./models/task");
const Story = require("./models/story");
const User = require("./models/user");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const storyRouter = require("./routers/story");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(storyRouter);


app.listen(port,()=>{
    console.log("Server started at PORT:" + port);
});

//const User = require("./models/user");

//demo();