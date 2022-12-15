const jwt=require('jsonwebtoken');
const userDetails=require('../db/mongo');
const errorResponse = require('../utils/error-response');

const accessTokenSecret = 'youraccesstokensecret';
let accessToken;
module.exports.fetchByEmail = async (request, response)=>{
    const email = request.body.email;
    const password=request.body.password;
    const rec = await userDetails.findByEmail(email);
    if(!rec){
        return response.status(404).send(errorResponse.notFoundResponse({message:'Username does not exists'}))
    }
    if(password !== rec.password){
        return response.status(200).send(errorResponse.badRequestResponse({message:'Password is incorrect'}))
    }

    if(rec){
       accessToken= jwt.sign({email:rec.email},accessTokenSecret,{expiresIn: '30m'})
    }

    return response.status(200).send(errorResponse.successResponse({message:'Logged In  Successfully!!',accessToken}))
}