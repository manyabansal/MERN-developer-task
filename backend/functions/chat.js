import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({path : '../.env'});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const messageHistory = [{ content: "Hello, how are you?" }];
async function Message() {
  const response = await openai.chat.completions.create({
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...messageHistory.map((message) => ({ role: "user", content: message.content })),
],
    model: "gpt-3.5-turbo",
  });
  
  console.log(response.choices[0].message.content);
}

Message();