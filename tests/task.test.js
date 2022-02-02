const app = require("../app");
const Story = require("../models/story");
const User = require("../models/user");
const {userOneId, userOne, setupDatabase} = require("./fixtures/db");
const request = require("supertest");

beforeEach(setupDatabase);


test("Should create new Stories",async ()=>{
    const response = await request(app).post("/stories")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send(
        {
            description:"New task for test"
        }
    ).expect(201); 
    console.log(response.body);
    const task = await Story.findById(response.body._id);
    console.log(task);
    expect(task).not.toBeNull();  
})