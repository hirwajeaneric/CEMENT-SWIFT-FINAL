const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        trim: true, 
        required: [true, 'Full name must be provided'],
        minlength: 3,
    },
    alias: { 
        type: String, 
        trim: true,
        required: false, 
        minlength: 3,
    },
    companyDescription: { 
        type: String, 
        trim: true, 
        required: false,
    },
    email: { 
        type: String, 
        trim: true, 
        required: [true, 'Email must be provided'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ]
    },
    phone: { 
        type: String, 
        required: [true, 'Phone number must be provided'],
        maxlength: 12,
        minlength: 10,
    },
    password: { 
        type: String, 
        required: [true, 'Password must be provided'], 
        minlength: 8, 
    },
    description: { 
        type: String, 
        required: false, 
    },
    profilePicture: { 
        type: String, 
        required: false, 
    },
    status: {
        type: String,
        required: false,
        enum: {
            values: ["Active", "Inactive"],
            message: '{VALUE} is not supported as a user status'
        },
        default: "Active"
    }
}) 

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    if (!this.userType === 'DJ') {
	this.status = 'Active';
    }
});

userSchema.methods.createJWT = function() {
    return jwt.sign(
        {
            userId: this._id,  
            email: this.email,
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('user', userSchema);
