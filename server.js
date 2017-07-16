const express = require('express');
const app = express();

const bodyParse = require('body-parser');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));


app.use(express.static('public'));


let messages = [];
let users = [];

app.post('/messages', (req, res) => {
    messages.push(req.body);
    res.json(messages);
    console.log(messages);
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/users', (req, res) => {
    users.push(req.body);
    res.json(users);
});


app.listen(3000, () => {
    console.log("Serer is listening on port 3000");
});



