const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')
const crypto = require('crypto')
const {ObjectId} = mongoose.Schema
const Post = require("./post");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        trim: true,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    following: [{type: ObjectId, ref: 'User'}],
    followers: [{type: ObjectId, ref: 'User'}],
    resetPasswordLink: {
        data: String,
        default: ""
    },
    role: {
        type: String,
        default: "subscriber"
    }
})

// hash pw
userSchema.virtual('password').set(function(password){
    //tem vir field
    this._password = password
    //get time
    this.salt = uuidv1()
    //encrpt pw
    this.hashed_password = this.encryptPassword(password)

}).get(function() {
    return this._password
})

//methods
userSchema.methods = {

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function(password) {
        if(!password) return "";
        try {
            return crypto.createHash('sha1', this.salt).update(password).digest('hex')
        } catch (err) {
            return "";
        }
    }
}

// pre middleware
userSchema.pre("remove", function(next) {
    Post.remove({ postedBy: this._id }).exec();
    next();
});

module.exports = mongoose.model("User", userSchema)