const mongoose = require('mongoose');

const multer = require('multer');   // require multer for storing the files
const path = require('path');
const EXCEL_PATH = path.join('/uploads/excel');   // contains the storage folder where the excel file will be stored

// creating schema for user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    mobileNo: {
        type: String
    },
    dob: {
        type: String
    },
    workExperience: {
        type: String
    },
    resumeTitle: {
        type: String
    },
    currentLocation: {
        type: String
    },
    postalAddress: {
        type: String
    },
    currentEmployer: {
        type: String
    },
    currentDesignation: {
        type: String
    }
},{
    timestamps: true
});

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, '..', EXCEL_PATH));
//     },
//     filename: function (req, file, cb) {
//       let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix);
//     }
//   });

// static method which belongs to userSchema
// userSchema.statics.uploadExcel = multer({ storage: storage }).single('excel');
// userSchema.statics.excelPath = EXCEL_PATH;

// creating a model of userSchema

const User = new mongoose.model('User', userSchema);

module.exports = User;