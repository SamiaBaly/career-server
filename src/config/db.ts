import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DATABASE_URL as string;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export const db = client.db("careerPilotDB");

export const connectDB = async () => {
  try {
    await client.connect();

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);

    process.exit(1);
  }
};