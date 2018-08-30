//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5b87ffa531d6ef411c145be3")
    // }, {
    //     // use the "set" update operator
    //     $set: {
    //        completed: true 
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });


//Challenge: update the name of a user in Users, and incrememt their age by 1

db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5b87fa0331d6ef411c145af8")
}, {
    // use the "set" update operator
    $set: {
       name: "Bob"
    },
    $inc: {
        age: 1
    }
}, {
    returnOriginal: false
}).then((result) => {
    console.log(result);
});


    //db.close();
});