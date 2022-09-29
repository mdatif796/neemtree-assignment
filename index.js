require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const nodeSassMiddleware = require('node-sass-middleware');
const path = require('path');
const XLSX = require('xlsx');
const multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/excel');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
let upload = multer({storage: storage});

const app = express();
const port = 8000;
const db = require('./config/databaseConnection');
const User = require('./models/users');

// middleware for using scss
app.use(nodeSassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(bodyParser.urlencoded({extended: false}));

// setting up the static files
app.use(express.static('./assets'));


// setting up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// app.use('/', require('./routes'));
app.get('/', function(req, res){
    return res.render('home');
});


app.post('/uploadfile',upload.single('uploadfile'), async function(req, res){
    try {
        let workbook =  XLSX.readFile(req.file.path);
        var sheet_namelist = workbook.SheetNames;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[0]]);
        for(xl of xlData){
            let user = await User.findOne({email: xl['Email']});
            if(!user){
                await User.create({
                    name: xl['Name of the Candidate'], 
                    email: xl['Email'], 
                    mobileNo: xl['Mobile No.'],
                    dob: xl['Date of Birth'],
                    workExperience: xl['Work Experience'],
                    resumeTitle: xl['Resume Title'],
                    currentLocation: xl['Current Location'],
                    postalAddress: xl['Postal Address'],
                    currentEmployer: xl['Current Employer'],
                    currentDesignation: xl['Current Designation']
                });
            }
        }
        return res.send('<h1>Successfully added to the mongoDB !!</h1>');
    } catch (error) {
        
    }
});








app.listen(process.env.PORT || port, function(err){
    if(err){
        console.log('Error in connecting with the express server ', err);
        return;
    }
    console.log('Express server successfully connected with the port:', port);
    return;
});