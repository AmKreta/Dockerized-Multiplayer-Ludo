const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    try {
        const saltRounds = 10;
        const hash = bcrypt.hash(this.password, saltRounds);
        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.validatePassword = async (password) => {
    const match = await bcrypt.compareSync(password, this.password);
    return match;
}

module.exports = mongoose.model('user', userSchema);