const jwt=require('jsonwebtoken');
const mongo=require('../db/mongo');
const errorResponse=require('../utils/error-response');

const accessTokenSecret = 'youraccesstokensecret';
module.exports.authenticateUser = async (request, response, next) => {
    const header = request.headers.authorization;
    if (header) {
        const token = header.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return response.status(401).send(errorResponse.unAuthorizedErrorResponse({message:'user is not authorized to access the resource'}));
            }
            request.user = user;
            next();
        });
    } else {
        response.sendStatus(401);
    }
};

module.exports.saveTask = async (request, response) =>{
    const email= request.body.email;
    const task = request.body.task;
    await mongo.saveTaskList({email,task,status:'pending'});
    return response.status(200).send(errorResponse.successResponse({message:'task saved successfully'}))
}


module.exports.listTask = async (request, response) =>{
    const email= request.params.email;
    const result = await mongo.viewList(email);
    return response.status(200).send(errorResponse.successResponse({message:result.map((rec)=>{return rec.task})}))
}

module.exports.getListByStatus = async (request, response) =>{

    console.log(request.body.status)
    const result = await mongo.checkStatus(request.body.status);
    return response.status(200).send(errorResponse.successResponse({message:result.map((rec)=>{return rec.task})}))
}




