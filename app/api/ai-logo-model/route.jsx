import { AILogoPrompt } from "@/configs/AiModel";
import axios from "axios";
import { NextResponse } from "next/server";

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY; 

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    // Generate AI text prompt for logo
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    console.log("AI Prompt Result:", AiPromptResult.response.text());
    const AIPrompt = JSON.parse(AiPromptResult.response.text());
    console.log("AIPrompt:", AIPrompt);
    

    // Generate AI logo image from AI model
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
      AIPrompt.prompt,
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    // Convert to base64 image
    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;
    console.log("Base64 Image:", base64ImageWithMime);

    // Save to firebase database (implementation omitted)

    return NextResponse.json({ image: base64ImageWithMime });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error generating logo" });
  }
}