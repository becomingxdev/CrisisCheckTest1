import { google } from "@ai-sdk/google"
import { generateText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const { text } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt: `You are a crisis management assistant providing immediate emergency guidance. 
      
      CRITICAL INSTRUCTIONS:
      - For life-threatening emergencies, ALWAYS recommend calling emergency services (112 in India) FIRST
      - Provide clear, actionable safety instructions
      - Be concise but comprehensive
      - Include specific do's and don'ts
      - Mention relevant emergency contact numbers for India (112-Emergency, 100-Police, 101-Fire, 108-Medical)
      
      User's emergency situation: ${message}
      
      Provide immediate guidance and safety instructions:`,
      maxOutputTokens: 500,
      temperature: 0.3, // Lower temperature for more consistent emergency responses
    })

    // Determine quick actions based on the response content
    const quickActions = []
    const lowerText = text.toLowerCase()

    if (lowerText.includes("call") || lowerText.includes("emergency") || lowerText.includes("112")) {
      quickActions.push({ label: "Call Emergency: 112", action: "emergency", urgent: true })
    }
    if (lowerText.includes("fire") || lowerText.includes("101")) {
      quickActions.push({ label: "Fire Emergency: 101", action: "fire", urgent: true })
    }
    if (lowerText.includes("medical") || lowerText.includes("ambulance") || lowerText.includes("108")) {
      quickActions.push({ label: "Ambulance: 108", action: "medical", urgent: true })
    }
    if (lowerText.includes("police") || lowerText.includes("100")) {
      quickActions.push({ label: "Police: 100", action: "police", urgent: true })
    }
    if (lowerText.includes("shelter") || lowerText.includes("evacuation")) {
      quickActions.push({ label: "Find Shelter", action: "shelter" })
    }

    // Default emergency actions if none detected
    if (quickActions.length === 0) {
      quickActions.push(
        { label: "Emergency: 112", action: "emergency", urgent: true },
        { label: "Medical: 108", action: "medical", urgent: true },
      )
    }

    return Response.json({
      response: text,
      quickActions,
    })
  } catch (error) {
    console.error("Crisis guide API error:", error)
    return Response.json(
      {
        response:
          "I'm experiencing technical difficulties. For immediate life-threatening emergencies, please call 112 right away. I'll try to assist you again shortly.",
        quickActions: [
          { label: "Emergency: 112", action: "emergency", urgent: true },
          { label: "Medical: 108", action: "medical", urgent: true },
        ],
      },
      { status: 500 },
    )
  }
}
