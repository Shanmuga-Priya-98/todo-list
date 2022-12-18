const constants = require('../utils/constants');
const mongo=require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';

let dbConnection, connection;

const connectToDB = async ()=>{
    dbConnection= await mongo.connect(dbUrl, { useUnifiedTopology: true });
    connection=dbConnection.db(constants.DBNAME);
    return connection;
}

module.exports.save= async (userDetails) =>{
    try {
        const db =  await connectToDB();
        const created_at = new Date();
        const updated_at = new Date();
        const response = await db.collection(constants.USER_DETAILS).insertOne({...userDetails, created_at, updated_at},(err,record)=>{
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
        const response = await  db.collection(constants.USER_DETAILS).find({}).toArray();
        return response;
    }catch (err){
        console.log(err)
    }
}


module.exports.findByEmail = async (email) =>{
    try {
        const db =  await connectToDB();
        const response = await  db.collection(constants.USER_DETAILS).findOne({email});
        if(!response){
            return null;
        }else{
            return {email:response.email,password: response.password};
        }

    }catch (err){
        console.log(err)
    }
}


module.exports.saveTaskList = async (payload) =>{
    try {
        const db =  await connectToDB();
        const created_at = new Date();
        const updated_at = new Date();
        const response = await db.collection(constants.TODO_LIST_DETAILS).insertOne({...payload, created_at, updated_at},(err,record)=>{
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

module.exports.viewList = async (email)=>{
    try {
        const db =  await connectToDB();
        const response = await  db.collection(constants.TODO_LIST_DETAILS).find({email}).toArray();
        console.log('----------', response)
        if(!response){
            return null;
        }else{
            return response;
        }

    }catch (err){
        console.log(err)
    }
}

module.exports.checkStatus = async (status)=>{
    try {
        const db =  await connectToDB();
        console.log('...........', status)
        const response = await  db.collection(constants.TODO_LIST_DETAILS).find({status}).toArray();

        if(!response){
            return null;
        }else{
            return response;
        }

    }catch (err){
        console.log(err)
    }
}