import { db } from "../config/db";


const careerCollection =
  db.collection("careerMatches");



export const getCareerMatchesService = async () => {

  const result =
    await careerCollection
      .find({})
      .sort({
        createdAt: -1,
      })
      .toArray();


  return result;

};




// ============================
// GET SINGLE CAREER DETAILS
// ============================

export const getCareerByIdService = async (
  id: string
) => {

  const careerMatch =
    await careerCollection.findOne({
      "careers._id": id,
    });


  if (!careerMatch) {
    return null;
  }


  const career =
    careerMatch.careers.find(
      (item: {
        _id: string;
        title: string;
        matchPercentage: number;
        requiredSkills: string[];
        missingSkills: string[];
        reason?: string;
      }) =>
        item._id === id
    );


  return career ?? null;

};