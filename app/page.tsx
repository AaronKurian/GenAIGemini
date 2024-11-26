"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function Home() {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const genAi = new GoogleGenerativeAI(apikey ? apikey : "");
  const model = genAi.getGenerativeModel({ model: "gemini-pro" });

  const [text, setText] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const prompt = `
  You are Roshan, a highly advanced, general-purpose chatbot with an encyclopedic knowledge of all subjects and topics. 
  You can accurately and concisely answer any question about science, mathematics, health, computer science, programming, web development (including React, Next.js, and Tailwind CSS), 
  hardware, software, electronics, mechanical systems, Earth, space, history, geography, languages, and more. 
  You are also skilled in solving complex problems, explaining concepts, and providing guidance on technical and non-technical topics like colleges, laptops, phones, cars, electricity, water, places, dates, and years.
  When responding, aim to be clear, precise, and provide actionable insights when possible. Always tailor your response to the context of the user's query.
  `;
   //creating witty and humorous responses. Provide a light and positive pickup line when prompted.";

  async function generate() {
    try {
      const result = await model.generateContent(prompt + text);
      const responses = await result.response;
      setResponse(responses.text);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Failed to generate a response. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-md py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 mr-3 rounded-full border border-purple-500"
            />
            <h1 className="text-3xl font-extrabold text-purple-400">
              Roshan AI
            </h1>
          </div>
          <nav className="flex space-x-6">
            <a
              href="#"
              className="text-white hover:text-purple-300 transition-all font-medium"
            >
              Home
            </a>
           
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex flex-col justify-center items-center px-6">
        <div className="max-w-4xl w-full bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">
          The Ultimate Answer Bot for Everything Under the Sun!
          </h2>
          {/* <textarea
            placeholder="Type your prompt here..."
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white mb-4"
            rows={5}
            onChange={(e) => setText(e.target.value)}
          ></textarea> */}

          <textarea
            name="promptInput"
             id="promptInput"
              cols={25}
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents a new line in the textarea
                  generate(); // Calls the `generate` function
                }
              }}
              placeholder="Type your prompt here and press Enter..."
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white mb-4"
              />


          <button
            onClick={generate}
            className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all"
          >
            Generate
          </button>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">
              AI Response:
            </h3>
            <div className="p-4 bg-gray-700 border border-gray-600 rounded-lg">
              {response || "No response generated yet."}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4">
      <div className="mx-auto flex justify-center items-center px-6 h-10">
  <p className="text-gray-400 text-sm text-center">
    &copy; 2024 Roshan AI. All Rights Reserved.
  </p>
</div>

      </footer>
    </div>
  );
}
