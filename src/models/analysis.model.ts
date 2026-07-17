import { Collection } from "mongodb";
import { db } from "../config/db";
import { IAnalysis } from "../types/analysis.types";


export const analysisCollection: Collection<IAnalysis> =
  db.collection<IAnalysis>("analyses");