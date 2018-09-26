require('./config/config')

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT;

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
    //get the id
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

app.delete('/todos/:id', (req, res) => {
    //get the id
    var id = req.params.id;

    //validate the id. If not, return 404
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    //remove todo by id and send doc back
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            //If error send 400 no body
            res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send();
    }
  
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
});

//POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate ,(req, res) => {
    res.send(req.user);
});

// POST /users/login
// {email, password} Use bcrypt compare to compare plaintext password with hashed value
app.post('/users/login', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on Port ${port}`);
});

module.exports = {app};