
const mongoose = require('mongoose').default;
const bcrypt = require('bcrypt');
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
//Schemas
const UserSchema = new mongoose.Schema({
    username: {
        type: String, required: true, unique: true, trim: true
    },
    email: {
        type: String, required: true, unique: true, trim: true,
        validate: {
            validator: (v) => {
                return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {type: String, required: true, minlength: 6},
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {type: Date, default: Date.now},

});

//hashing
UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        // Hash the password with salt
        this.password = await bcrypt.hash(this.password, salt);
        this.updatedAt = Date.now();
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;