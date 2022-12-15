const jwt=require('jsonwebtoken');
const mongo=require('../db/mongo');
const errorResponse=require('../utils/error-response');

const accessTokenSecret = 'youraccesstokensecret';
module.exports.authenticateUser = async (request, response, next) => {
    const header = request.headers.authorization;
    console.log('-----', header)
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

module.exports.searchByGender = async (authorization,request,response) =>{

    const gender=request.query.gender;
    const result = await mongo.searchGender(gender);
    if(result){
        return response.status(200).send(errorResponse.successResponse({message:result}));

    }else{
        return response.status(404).send(errorResponse.notFoundResponse({message:'no data found'}));

    }
}

