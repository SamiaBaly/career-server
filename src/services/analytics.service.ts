import { analysisCollection } from "../models/analysis.model";

export const getAnalyticsService = async (
  userId: string
) => {

  const analyses = await analysisCollection
    .find({
      userId: userId
    })
    .toArray();


  if (analyses.length === 0) {
    return {
      totalAnalyses: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      latestScore: 0
    };
  }


  const totalAnalyses = analyses.length;


  const scores = analyses.map(
    (item) => item.score
  );


  const averageScore =
    Math.round(
      scores.reduce((a, b) => a + b, 0) /
      totalAnalyses
    );


  const highestScore =
    Math.max(...scores);


  const lowestScore =
    Math.min(...scores);


  const latestScore =
    analyses[analyses.length - 1].score;


  return {
    totalAnalyses,
    averageScore,
    highestScore,
    lowestScore,
    latestScore
  };
};