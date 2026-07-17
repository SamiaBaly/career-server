import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const generateResumeAnalysis =
  async (resume: any) => {


    const response =
      await openai.chat.completions.create({

        model: "gpt-4o-mini",

        response_format: {
          type: "json_object",
        },

        messages: [

          {
            role: "system",
            content:
              "You are an expert resume reviewer. Always return valid JSON only."
          },


          {
            role: "user",
            content:
              `
Analyze this resume:

${JSON.stringify(resume)}

Return JSON format:

{
  "score": number,
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[]
}
`
          }

        ]

      });


    const result =
      response.choices[0].message.content;


    return JSON.parse(result || "{}");

  };