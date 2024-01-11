const JobPictureModel = require('../models/jobPictures.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors/index');
const multer= require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => { callback(null, './pictures') },
    filename: (req, file, callback) => { callback(null, `picture-${file.originalname}`) }
})

const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback("Not an image! Please upload only images.", false);
    }
  };

const upload = multer({ 
    storage: multerStorage,
    fileFilter: multerFilter 
});

const attachFile = async (req, res, next) => {
    if (req.file) {
        req.body.picture = req.file.filename;
        next();
    } else {
        next();
    }
}

const add = async (req, res) => {
    console.log(req.body);
    const  JobPicture = await JobPictureModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: 'Picture added', JobPicture })
};

const getAll = async(req, res) => {
    const jobPictures = await JobPictureModel.find({})
    res.status(StatusCodes.OK).json({ nbHits:  jobPictures.length,  jobPictures })
};

const findById = async(req, res) => {
    const  JobPictureId = req.query.id;
    const  JobPicture = await JobPictureModel.findById( JobPictureId);
    if(!JobPicture){
        throw new BadRequestError(`JobPicture not found!`)
    }
    res.status(StatusCodes.OK).json({ picture: JobPicture })
};

const findByJobId = async(req, res) => {
    const jobId = req.query.jobId;
    const jobPictures = await JobPictureModel.find({ jobId: jobId });
    res.status(StatusCodes.OK).json({ nbHits:  jobPictures.length,  jobPictures });
};

const findByDjId = async(req, res) => {
    const djId = req.query.djId;
    const pictures = await JobPictureModel.find({ djId: djId });
    res.status(StatusCodes.OK).json({ nbHits: pictures.length, pictures });
};

const edit = async(req, res) => {
    const  JobPicture = req.body;
    const  JobPictureId = req.query.id;
    
    const updated = await JobPictureModel.findByIdAndUpdate({ _id:  JobPictureId }, JobPicture);
    const updatedJobPicture = await JobPictureModel.findById(updated._id);

    res.status(StatusCodes.OK).json({ message: 'Updated', JobPicture: updatedJobPicture })
};

const remove = async(req, res) => {
    const jobPictureId = req.query.id;
    const deletedJobPicture = await JobPictureModel.findByIdAndRemove({ _id: jobPictureId});

    if (!deletedJobPicture) {
        throw new NotFoundError(`JobPicture with id ${jobPictureId} not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'Deleted'})
};

module.exports = { add, getAll, findById, findByDjId, findByJobId, edit, upload, attachFile, remove }
