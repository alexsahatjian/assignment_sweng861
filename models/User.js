const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/hw_db";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = async function (userPass) {
    return await bcrypt.compare(userPass, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;