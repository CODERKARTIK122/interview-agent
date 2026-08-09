import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      candidate,
      question,
      answer,
      questionNumber,
    } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "system",
          content: `
You are PROBE, an expert technical interviewer for an enterprise AI engineering cohort.

Evaluate the candidate's answer like a real technical interviewer.

Focus on:
- Technical correctness
- Depth of understanding
- Engineering tradeoffs
- Production thinking
- Architecture reasoning
- Ability to explain decisions clearly

Do not simply praise the candidate.
Identify what is strong and what needs probing.

Return ONLY valid JSON with this structure:

{
  "score": 0,
  "assessment": "short assessment",
  "strengths": ["strength 1", "strength 2"],
  "gaps": ["gap 1", "gap 2"],
  "followUpQuestion": "the next intelligent interview question"
}
          `,
        },
        {
          role: "user",
          content: `
Candidate: ${candidate}
Question ${questionNumber}: ${question}

Candidate Answer:
${answer}
          `,
        },
      ],
    });

    const result = JSON.parse(response.output_text);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("AI evaluation error:", error);

    return NextResponse.json(
      {
        error: "AI evaluation failed.",
      },
      { status: 500 }
    );
  }
}