const express=require('express');
const path = require("path");
const bodyParser = require('body-parser')
const {logger}=require('./src/utils/logger')
const registration=require('./src/handlers/registration')
const login=require('./src/handlers/login')
const search=require('./src/handlers/search')
const router=express();

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/user/register', registration.saveUserData)
router.post('/user/login', login.fetchByEmail)
router.get('/user',search.authenticateUser, search.searchByGender)
router.use(express.static(path.join(__dirname,'./front-end-code')));

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./front-end-code/index.html'));
});
router.listen(9000,()=> {
    logger.info('connected to server with port number 9000')
})