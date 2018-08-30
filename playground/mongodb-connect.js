//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     name: 'Roy',
    //     Age: 33
    // }, (err, result) => {
    //     if(err) {
    //         return('Unable to insert todo', err);
    //     }
        
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    //Insert new doc into the Users collection w/ name, age, and location

    db.collection('Users').insertOne({
        name: 'Roy',
        age: 33,
        location: 'Seattle'
    }, (err, result) => {
        if(err) {
            return('Unable to insert user', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 4));
    });

    db.close();
});