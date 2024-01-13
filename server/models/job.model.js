const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    price: { 
        type: Number, 
        required: true,
        default: 30000 
    },
    amount: {
      type: Number, 
      required: true,
      default: 10,  
    },
    deliveryLocation: {
        type: String, 
        required: [true, "Drop Location  is required"],
    },
    deliveryGoogleMapLocation: {
        type: String, 
        required: false
    },
    requestingUserName: { 
        type: String, 
        required: true 
    },
    requestingUserId: { 
        type: String, 
        required: true 
    },
    requestingUserPhone: { 
        type: String, 
        required: [true, "Your phone number is required"],
        maxlength: 13,
        minlength: 10 
    },
    requestingUserEmail: { 
        type: String, 
        required: [true, "Your email address is required"], 
    },
    status: { 
        type: String, 
        required: true,
        default: "Pending",
        enum: {
            values: ["Pending","Confirmed","Rejected"],
            message: '{VALUE} is not supported as a status.'
        }
    },
    sendDate: { 
        type: Date, 
        required: true,
        default: Date.now() 
    }
}) 

module.exports = mongoose.model('job', jobSchema);
