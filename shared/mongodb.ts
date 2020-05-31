import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const client = new MongoClient();
/**
 * MongoDB Atlas SRV URL
 * Change username and password to appropriate
 */
client.connectWithUri("mongodb+srv://badal:badal@cluster0-veuja.mongodb.net/");

const db = client.database("denographql");

export default db;