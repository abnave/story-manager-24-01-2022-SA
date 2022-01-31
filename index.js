const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const storyRouter = require("./routes/story");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(storyRouter);


app.listen(port,()=>{
    console.log("Server started at PORT:" + port);
});