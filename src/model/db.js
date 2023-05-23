const { MongoClient, ObjectId } = require("mongodb");
const { param } = require("../api");

let singleton;

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

async function findAll(collection) {
    const db = await connect();
    return await db.collection(collection).find().toArray();
}

async function insertOne(collection, objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}

async function findOne(collection, _id) {
    const db = await connect();
    let obj = await db.collection(collection).find({"_id":new ObjectId(_id)}).toArray();
    if(obj)
        return obj[0];
    return false;
}

async function updateOne(collection, object, param) {
    const db = await connect();
    return await db.collection(collection).updateOne(param, {$set: object});
    
}

module.exports = {findAll,insertOne,findOne,updateOne}