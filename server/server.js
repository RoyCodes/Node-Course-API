var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    // send back request in body
    // res.send(req.params);

    //validate id using isValid like in mongoose-queries.js
    if (!mongoose.Types.ObjectId.isValid(id)) {
        //if not valid, return 404 with no body
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            // if no todo, return 404 with no body
            return res.status(404).send();
        }
        //if todo, send back todo in body
        res.send({todo});
    }).catch((e) => {
        //if error, send 400 with no body
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('Started on Port 3000');
});

module.exports = {app};