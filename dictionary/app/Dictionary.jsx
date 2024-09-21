"use client"
import React, { useState } from 'react'

const Dictionary = () => {
  const [word,setWord]=useState("");
  const [definition,setDefinition]=useState(null);
  const [audio,setAudio]=useState("");
  const [error,setError]=useState("")

  const InputValue=(e)=>{
    setWord(e.target.value);
  }

  const fetchWordDefinition=async()=>{
    if(word.trim()===""){
      setError("Please enter a word");
      return;
    }
    try {
      const response =await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if(!response.ok){
        throw new Error("word not found");
      }
      const data=await response.json();
      const wordData=data[0];
      const phonetics=wordData.phonetics.find(p=>p.audio);
      setDefinition(wordData.meanings[0].definitions[0].definition);
      setAudio(phonetics? phonetics.audio:"");
      setError("")
    } catch (error) {
      setError(error.message);
      setDefinition(null);
      setAudio("")
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    fetchWordDefinition();
  }

  return (
    <>
 <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-gray-900">
        <h1 className="text-center text-3xl font-bold mb-6 text-blue-600">Dictionary App</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="input"
            id="input"
            value={word}
            onChange={InputValue}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Type a word..."
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {definition && (
          <div className="mt-6">
            <p className="text-lg font-semibold">Definition:</p>
            <p className="text-gray-700 mt-2">{definition}</p>
            {audio && (
              <div className="mt-4">
                <p className="text-lg font-semibold">Audio:</p>
                <audio controls className="w-full mt-2">
                  <source src={audio} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
      </>
  )
}

export default Dictionary