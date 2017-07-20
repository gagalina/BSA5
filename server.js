const express = require('express');
const app = express();


const bodyParse = require('body-parser');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));


app.use(express.static('public'));


let messages = [];
let users = [];


app.post('/messages', (req, res) => {
    if(messages.length >= 100){
        messages.push(req.body);
        messages.shift();
    }else{
        messages.push(req.body);
    }
    res.json(messages);
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/users', (req, res) => {
    let user = req.body;
    user.isTyping = false;
    users.push(user);
    res.json(users);
});

app.put('/users', (req, res) => {
    let isTyping = req.body.isTyping;
    let user = req.body.user;
    users.map((el) => {
        if(el.user === user){
            el.isTyping = isTyping;
        }
    });
    res.json(users);

});

app.get('/users', (req, res) => {
    res.json(users);
});


app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});



