const constants = require('../utils/constants');
const mongo=require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';

let dbConnection, collection;

const connectToDB = async ()=>{
    dbConnection= await mongo.connect(dbUrl, { useUnifiedTopology: true });
    collection=dbConnection.db(constants.DBNAME).collection(constants.USER_DETAILS);
    return collection;
}

module.exports.save= async (userDetails) =>{
    try {
        const db =  await connectToDB();
        const created_at = new Date();
        const updated_at = new Date();
        const response = await  db.insertOne({...userDetails, created_at, updated_at},(err,record)=>{
            if(err){
                console.log(err)
            }

            return record.insertedId;
        })

        return response

    }catch (err){
        console.log(err)
    }
}

module.exports.fetchRecords = async () =>{
    try {
        const db =  await connectToDB();
        const response = await  db.find({}).toArray();
        return response;
    }catch (err){
        console.log(err)
    }
}


module.exports.findByEmail = async (email) =>{
    try {
        const db =  await connectToDB();
        const response = await  db.findOne({email});
        if(!response){
            return null;
        }else{
            return {email:response.email,password: response.password};
        }

    }catch (err){
        console.log(err)
    }
}

module.exports.searchGender = async (params)=>{
    try {
        const db =  await connectToDB();
        const response = await  db.find({gender:params}).toArray();
        return response;
    }catch (err){
        console.log(err)
    }
}

