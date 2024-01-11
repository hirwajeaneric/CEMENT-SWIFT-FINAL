const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    description: { 
        type: String, 
        required: [true, 'Description must be provided'] 
    },
    price: { 
        type: Number, 
        required: true,
        default: 40000 
    },
    jobType: { 
        type: String,
        required: [true, "Job type must be provided"], 
        enum: {
            values: ["Event Management","MC","Birth Day party sound system","Wedding sound system","Private party sound system","Public meeting sound system","Private meeting sound system","Concert","Club"],
            message: '{VALUE} is not supported as a job type.'
        }
    },
    jobLocation: {
        type: String, 
        required: [true, "Location of the job is required"],
    },
    jobGoogleMapLocation: {
        type: String, 
        required: false
    },
    startDate: {
        type: Date, 
        required: [true, "You must provide the start date of the job."],
    },
    endDate: {
        type: Date,
        required: [true, "You must provide the end date of the job."]
    },
    suggestedDjId: {
        type: String,   
        required: false,
    },
    suggestedDjName: {
        type: String, 
        required: false,
    },
    requestingUserName: { 
        type: String, 
        required: true 
    },
    requestingUserId: { 
        type: String, 
        required: true 
    },
    requestingUserType: { 
        type: String, 
        required: [true, "User type is required"],
        enum: {
            values: ["Company","Personal","Group","Family"],
            message: '{VALUE} is not supported as a status.'
        }
    },
    requestingCompanyName: { 
        type: String, 
        required: false 
    },
    requestingUserName: { 
        type: String, 
        required: [true, "Your full name is required"] 
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
    paymentInstallment: {
        type: Number,
        required: true,
        default: 40000,
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
