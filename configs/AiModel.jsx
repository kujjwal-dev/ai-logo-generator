const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const AIDesignIdea = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    export const AILogoPrompt = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a text prompt to create Logo for Logo Title/Brand name : ai logo,with description: ai logo maker, with Color combination of Ocean Blues, also include the {logoIdea} and include Modern Mascot Logos design idea and Referring to this Logo Prompt:A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.  Give me result in JSON portal with prompt field only"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"prompt\": \"Create a Modern Mascot Logo for the brand \\\"ai logo\\\", specializing in \\\"ai logo maker\\\". The logo should utilize a color combination of Ocean Blues. The {logoIdea} is a vibrant and friendly animated character with a playful expression. The character should have a classic uniform, a distinctive accessory, and hold a signature item representing ai logo maker. The design should feature small decorative touches and natural accents. The background should consist of a bold, circular design with subtle accents to highlight the character. Below the character, the brand name \\\"ai logo\\\" should be displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style should be fun, welcoming, and full of character, reflecting the ease and creativity of ai logo creation.\"\n}\n```\n"},
          ],
        },
      ],
    });
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
