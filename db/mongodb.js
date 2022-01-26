// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name:"Rushil",
    //     age:"32"
    // },(error,result)=>{
    //     if(error){
    //         return console.log("User not inserted");
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([{
    //     description:"Buy 5 dozen apples",
    //     completed:true
    // },{
    //     description: "Go to office",
    //     completed: false
    // }],(error,result)=>{
    //     if(error){
    //         return console.log("task not inserted");
    //     }
    //     console.log(result.ops);
    // });
    
    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').deleteOne({
    //     description: "Clean the house"
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // db.collection('tasks').find({completed:false},(error,result)=>{
    //     if(error){
    //         return console.log("Something went wrong");
    //     } 
    //     console.log(result);
    // });
    // db.collection('tasks').find({completed:false}).toArray((error,result)=>{
    //     if(error){
    //         return console.log("Something went wrong");
    //     } 
    //     console.log(result);
    // });
    db.collection('tasks').updateMany({completed:false},
        { $set:{
            completed:true
        }}).then((result)=>{
        console.log("updated");
    }).catch((error)=>{
        console.log("Something went wrong");
    });
})