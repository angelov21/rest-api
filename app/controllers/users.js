const STATUS_CODES = require('../constants/status-codes');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./private.pem', 'utf8');

//Create a new user
exports.add = (req,res) => {
    const { username, password } = req.body;

    const newUser = new User({ username, password });

    newUser.save()
        .then(() => res.status(STATUS_CODES.CREATED).send('User created successfully'))
        .catch(err => res.status(STATUS_CODES.ERROR).send({ 
            message: 'Error creating user',
            err
        }));
}

//Authenticate user with password
exports.authenticate = (req,res) => {    
    const { username, password } = req.body;

    User.findOne({ username }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    const token = jwt.sign({ username, password }, privateKey, { expiresIn: '10m' });
                        
                    res.status(STATUS_CODES.OK).send(token);
                } else {
                    res.status(STATUS_CODES.UNAUTHORIZED).send({ error: "Authentication failed!" });
                }
            })
        } else {
            res.status(STATUS_CODES.NOT_FOUND).send({ error: "User not found" });
        }
    })
}