const userDetails = require('../db/mongo');
const errorResponse = require('../utils/error-response');

module.exports.saveUserData = async (request, response) =>{
    const fullName=request.body.fullname;
    const userName=request.body.username;
    const email=request.body.email;
    const password=request.body.password;
    const confirmPass = request.body.confirm_password;
    const phoneNumber=request.body.phone_number;
    const gender=request.body.gender;

try{
    if(!fullName){
        return response.status(400).send(errorResponse.badRequestResponse({message:'fullName is required'}))
    }else if(!userName) {
        return response.status(400).send(errorResponse.badRequestResponse({message: 'userName is required'}))
    }else if(!email){
        return response.status(400).send(errorResponse.badRequestResponse({message:'email is required'}))
    }else if(!phoneNumber){
        return response.status(400).send(errorResponse.badRequestResponse({message:'phone number is required'}))
    }else if(!password){
        return response.status(400).send(errorResponse.badRequestResponse({message:'password is required'}))
    }else if(!confirmPass){
        return response.status(400).send(errorResponse.badRequestResponse({message:'confirm password is required'}))
    }else if(!gender){
        return response.status(400).send(errorResponse.badRequestResponse({message:'gender is required'}))
    }

    if(password!==confirmPass){
        return response.status(400).send(errorResponse.badRequestResponse({message:'password and confirm password did not match'}));
    }
    const payload=request.body;
    await userDetails.save(payload);
    return response.status(200).send(errorResponse.successResponse({message:'document inserted successfully'}))
}catch (err){
}
}

module.exports.fetchUserDetails = async (request, response)=>{
    const rec=await userDetails.fetchRecords();
    response.status(200).send(errorResponse.successResponse({message:rec}))
}

