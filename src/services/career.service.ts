import { db } from "../config/db";


const careerCollection =
  db.collection("careerMatches");



export const getCareerMatchesService = async (
  userId: string
) => {

  const result =
    await careerCollection
      .find({
        userId,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();


  return result;

};