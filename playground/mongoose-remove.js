const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Unlike remove, the below return the doc after removing so you can use it one last time
    // below takes query object {_id: 'X'}
    // Todo.findOneAndRemove
    //below takes id 'X'
    // Todo.findByIdAndRemove

Todo.findByIdAndRemove('5b91ef7df872c2a1afdc556d').then((todo) => {
    console.log(todo);
});