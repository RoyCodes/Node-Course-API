//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

// deleteMany

    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

// deleteOne

    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

// findOneAndDelete

    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // })

// // Challenge: delete dupes with specific name in Users

//     db.collection('Users').deleteMany({name: 'Roy'}).then((result) => {
//         console.log(result);
//     });


// Challenge: delete specific user from Users by _id

db.collection('Users').findOneAndDelete({
    _id: new ObjectID("5b87faf431d6ef411c145b2b")
}).then((result) => {
    console.log(JSON.stringify(result, undefined, 4));
});

    //db.close();
});