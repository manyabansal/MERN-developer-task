import talkify from 'talkify';
var player = new talkify.TtsPlayer(); //or new talkify.Html5Player()
player.playText('Hello world');
// import { promises, readFileSync, createReadStream } from "fs";
// import { resolve } from "path";
// import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: 'process.env.OPENAI_API_KEY' });

// const speechFile = resolve("./speech.mp3");

// async function main() {
//   const mp3 = await openai.audio.speech.create({
//     model: "tts-1",
//     voice: "alloy",
//     input: "Today is a wonderful day to build something people love!",
//   });
//   console.log(speechFile);
//   const buffer = Buffer.from(await mp3.arrayBuffer());
//   await promises.writeFile(speechFile, buffer);
// }
// main();