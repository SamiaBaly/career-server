export interface ICareerMatch {
  userId: string;
  resumeId: string;

  careers: {
    title: string;
    matchPercentage: number;
    requiredSkills: string[];
    missingSkills: string[];
  }[];

  createdAt: Date;
}