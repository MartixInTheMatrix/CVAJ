const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    warns: {type: Number, default: 0, required: false},
    warnsArray: {type:Array, required: false},
    level : {type: Number, default: 1},
    muted: {type: Boolean, default: false},
    kick: {type: Number, default: 0},
    partial_banned: {type: Boolean, default: false},

});

module.exports = mongoose.model("User", userSchema);