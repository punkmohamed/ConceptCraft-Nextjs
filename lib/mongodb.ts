import { MongoClient } from "mongodb";
if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MongoDB URI to .env.local");
}
const mongoClient = new MongoClient(process.env.MONGODB_URI as string);
const clientPromise = mongoClient.connect();

export default clientPromise;