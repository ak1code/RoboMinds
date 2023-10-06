import React, { useState } from 'react';

const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/chat/completions';


function OpenAI(): JSX.Element {
  const [generatedText, setGeneratedText] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let controller: AbortController | null = null; // Store the AbortController instance

  const generate = async () => {
    // Alert the user if no prompt value
    if (!inputText) {
      alert("Please enter a prompt.");
      return;
    }
  
    // Disable the generate button and enable the stop button
    setIsLoading(true);
  
    // Create a new AbortController instance
    controller = new AbortController();
    const signal = controller.signal;
  
    try {
      // Fetch the response from the OpenAI API with the signal from AbortController
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: inputText }],
          max_tokens: 100,
          stream: true, // For streaming responses
        }),
        signal, // Pass the signal to the fetch request
      });
  
      if (!response.body) {
        throw new Error("Response body is null.");
      }
      
      // Read the response as a stream of data
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let newText = "";
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
  
        // Massage and parse the chunk of data
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.trim() !== "" && line.trim() !== "[DONE]") {
            const parsedLine = JSON.parse(line);
            const { choices } = parsedLine;
            const { delta } = choices[0];
            const { content } = delta;
            // Update the UI with the new content
            if (content) {
              newText += content;
            }
          }
        }
      }
  
      setGeneratedText(newText);
    } catch (error) {
      // Handle fetch request errors
      if (signal.aborted) {
        alert("Request aborted.");
      } else {
        console.error("Error:", error);
        alert("Error occurred while generating.");
      }
    } finally {
      // Enable the generate button and disable the stop button
      setIsLoading(false);
      controller = null; // Reset the AbortController instance
    }
  };
  
  const stop = () => {
    // Abort the fetch request by calling abort() on the AbortController instance
    if (controller) {
      controller.abort();
      controller = null;
    }
  };

  return (
    <div className="bg-white text-black min-h-screen flex items-center justify-center">
      <div className="lg:w-1/2 2xl:w-1/3 p-8 rounded-md bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">
          Streaming OpenAI API Completions in JavaScript
        </h1>
        <div className="mt-4 h-48 overflow-y-auto">
          <p className="text-gray-500 text-sm mb-2">Generated Text</p>
          <p className="whitespace-pre-line" id="resultText">
            {generatedText}
          </p>
        </div>
        <input
          type="text"
          id="promptInput"
          className="w-full px-4 py-2 rounded-md bg-gray-200 placeholder-gray-500 focus:outline-none mt-4"
          placeholder="Enter prompt..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="flex justify-center mt-4">
          <button
            id="generateBtn"
            className={`w-1/2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 focus:outline-none mr-2 ${
              isLoading ? 'disabled:opacity-75 disabled:cursor-not-allowed' : ''
            }`}
            onClick={generate}
            disabled={isLoading}
          >
            Generate
          </button>
          <button
            id="stopBtn"
            className={`w-1/2 px-4 py-2 rounded-md border border-gray-500 text-gray-500 hover:text-gray-700 hover:border-gray-700 focus:outline-none ml-2 ${
              isLoading ? 'disabled:opacity-75 disabled:cursor-not-allowed' : ''
            }`}
            onClick={stop}
            disabled={!isLoading}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpenAI;
