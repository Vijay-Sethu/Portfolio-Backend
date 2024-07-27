const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    title: String,
    profile: String
    // _id: mongoose.Schema.Types.ObjectId,
    // accountId: mongoose.Types.ObjectId(ObjectId)
    // accountId: new mongoose.Types.ObjectId()
}, {
    versionKey: false,
    timestamps: true   
})
module.exports = mongoose.model("user", UserSchema)