"use client";
import {GoogleGenerativeAI} from "@google/generative-ai";
import{useState} from "react";
export default function Home() {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const genAi = new GoogleGenerativeAI(apikey ? apikey : "");
  const model = genAi.getGenerativeModel({model: "gemini-pro" });
  const [text,setText] = useState("");
  const [response, setResponse] = useState("");
  const prompt = "You are Roshan, a chatbot skilled at creating witty and humorous responses. Provide a light and positive pickup line when prompted.";
  async function generate() {
    const result = await model.generateContent(prompt + text);
    const responses = await result.response;
    setResponse(responses.text);
    
  }
  return (
    <main className="">
     <textarea
    name="" 
     id="" 
     cols={30} 
     rows={10} 
     onChange={(e) => {setText(e.target.value);}}></textarea>
     <button onClick = {generate}>Submit</button>
     <p>{response}</p>
         </main>
  );
}
