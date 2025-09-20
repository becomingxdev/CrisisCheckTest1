import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

const factCheckSchema = z.object({
  verdict: z.enum(["true", "false", "misleading", "unverified"]).describe("The fact-check verdict"),
  confidence: z.number().min(0).max(100).describe("Confidence level in percentage"),
  explanation: z.string().describe("Detailed explanation of the fact-check analysis"),
  sources: z.array(z.string()).describe("Relevant sources or references"),
  keyPoints: z.array(z.string()).describe("Key points that led to this verdict"),
})

export async function POST(req: Request) {
  try {
    const { message, type = "text" } = await req.json()

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-exp"),
      schema: factCheckSchema,
      prompt: `You are a professional fact-checker specializing in crisis information and misinformation detection.

      ANALYSIS GUIDELINES:
      - Analyze the claim for factual accuracy
      - Consider the source credibility if mentioned
      - Look for signs of misinformation, manipulation, or bias
      - Be especially vigilant about crisis-related misinformation (natural disasters, health emergencies, security threats)
      - Provide evidence-based analysis
      - If information cannot be verified, mark as "unverified" rather than guessing

      VERDICT CRITERIA:
      - TRUE: Information is factually accurate and verifiable
      - FALSE: Information is demonstrably incorrect or fabricated
      - MISLEADING: Contains some truth but is presented in a deceptive way or lacks important context
      - UNVERIFIED: Cannot be confirmed with available information

      ${type === "image" ? "Image content to analyze:" : "Text claim to fact-check:"} ${message}

      Provide a thorough fact-check analysis:`,
      maxOutputTokens: 800,
      temperature: 0.2, // Lower temperature for more consistent fact-checking
    })

    return Response.json(object)
  } catch (error) {
    console.error("Fact-check API error:", error)
    return Response.json(
      {
        verdict: "unverified",
        confidence: 0,
        explanation:
          "I encountered a technical error while analyzing this information. Please verify with official sources and try again.",
        sources: ["Official Government Sources", "Verified News Outlets", "Academic Institutions"],
        keyPoints: ["Technical analysis unavailable", "Recommend manual verification"],
      },
      { status: 500 },
    )
  }
}
