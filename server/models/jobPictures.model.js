const mongoose = require('mongoose');

const jobPictureSchema = new mongoose.Schema({
    picture: { 
        type: String, 
        required: [true, 'Picture is required'] 
    },
    djId: { 
        type: String, 
        required: true, 
    },
    name: { 
        type: String, 
        required: true, 
    },
    pictureDescription: { 
        type: String, 
        required: true, 
    },
    jobId: { 
        type: String,
        required: false, 
    },
    uploadDate: { 
        type: Date, 
        required: true,
        default: Date.now() 
    }
}) 

module.exports = mongoose.model('job_Picture', jobPictureSchema);