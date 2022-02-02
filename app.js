const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const storyRouter = require("./routes/story");
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(storyRouter);

module.exports = app;