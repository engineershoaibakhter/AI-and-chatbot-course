"use client"
import React, { useState } from 'react'

const Dictionary = () => {
  const [word,setWord]=useState("");
  const [definition,setDifinition]=useState(null);
  const [audio,setAudio]=useState("");
  const [error,setError]=useState("")

  const InputValue=(e)=>{
    setWord(e.target.value);
  }

  

  return (
    <>
    <h1 className='text-center text-2xl'>Dictionary App</h1>
    <label id='input'>Enter Text</label>
    <input type='text' name='input' id='input' onChange={InputValue}/>
    <button type='submit'>Submit</button>
    </>
  )
}

export default Dictionary