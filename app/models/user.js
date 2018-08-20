const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 2;

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        trim: true  
    }
});

UserSchema.pre('save', function() {
    return new Promise((resolve, reject) => {
        bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
            if (err) {
                console.log(`Error hashing password for user ${this.name}`);
                
                reject(err);
            } else {
                this.password = hash;
                
                resolve();
            }
        });
    })
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;