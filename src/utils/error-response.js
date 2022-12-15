module.exports.badRequestResponse = (payload)=>{
    return {
        response_code:400,
        error:'bad_request',
        payload
    }
}

module.exports.notFoundResponse = (payload)=>{
    return {
        response_code:404,
        error:'not_found',
        payload
    }
}

module.exports.successResponse = (payload)=>{
    return {
        response_code:200,
        error:'success',
        payload
    }
}

module.exports.unAuthorizedErrorResponse = (payload)=>{
    return {
        response_code:401,
        error:'unauthorized',
        payload
    }
}