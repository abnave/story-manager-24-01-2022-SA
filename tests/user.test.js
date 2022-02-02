const app = require("../app");
const User = require("../models/user");
const {userOneId, userOne, setupDatabase} = require("./fixtures/db");
const request = require("supertest");

beforeEach(setupDatabase);
test("demo test",()=>{
    
})
// test("Should add new user",async ()=>{
//     const response = await request(app).post("/users/signin").send(
//         {
//             name:"New1 User",
//             email:"new1@gmail.com",
//             password:"n1@123",
//             age:25
//         }
//     ).expect(201); 
//    // console.log(response.body).result.;
//     const user = await User.findById(response.body.result._id);
//     console.log(user);
//     expect(user).not.toBeNull();

//     //assertions about response
//     // expect(response.body).toMatchObject({
//     //         result : {
//     //             "age": 25,
//     //             "email": "new1@gmail.com",
//     //             "name": "New1 User",
//     //             "password": "n1@123"
                
//     //         },
//     //         token : user.tokens[0].token   
//     // })    
// })
// test("Should login default user",async ()=>{
//     const response = await request(app).get("/users/login").send(
//         {
//             email : 'testuser@test.com',
//             password : 'testuser@123'
//         }
//     ).expect(201); 
//     const user = await User.findById(userOneId);
//     expect(response.body.token).toBe(user.tokens[1].token);
// })
// test("Should login failure user",async ()=>{
//     await request(app)
//     .get("/users/login")
//     .send(
//         {
//             email : 'testuser@test.com',
//             password : 'testuser@12'
//         }
//     )
//     .expect(400); 
// })
// test("Should get user Info",async ()=>{
//     await request(app)
//     .get("/users/me")
//     .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
//     .send()
//     .expect(200); 
// })
// test("Should upload avatar",async ()=>{
//     const response = await request(app)
//     .post("/users/me/avatar")
//     .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
//     .attach("upload","tests/fixtures/profile-pic.jpg")
//     .expect(200); 
//     //console.log(response);
//     const user = await User.findById(userOneId);
//     expect(user.avatar).toEqual(expect.any(Buffer));
// })
// test("Should delete authenticated user",async ()=>{
//     await request(app)
//     .delete("/users/me")
//     .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
//     .send()
//     .expect(200); 
//     const user = await User.findById(userOneId);
//     expect(user).toBeNull();
// })
// test("Should not delete unauthenticated user ",async ()=>{
//     await request(app)
//     .delete("/users/me")
//     .set("Authorization",`Bearer ${userOne.tokens[0].token + 123}`)
//     .send()
//     .expect(401); 
// })