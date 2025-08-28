import React, { createContext, useState } from "react";
import run from "../gemini";

// Create Context
export const DataContext = createContext();

function UserContext({ children }) {
  let[speaking,setSpeaking]= useState(false);
  let[prompt,setPrompt]= useState("Listening..");
  let[response,setResponse]= useState(false);
  let[newtext,setNewtext]= useState(false);
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "en-US";
    window.speechSynthesis.speak(text_speak);
  }
  async function aiResponse(prompt){
   let text = await run(prompt);
   let newtext = text.split("**")&&text.split("*") && text.replace("google","Vanshika") && text.replace("Google","Vanshika") ;
   setPrompt(newtext);
   speak(newtext)
   setResponse(true)
   setTimeout(() => {
    setSpeaking(false)
   }, 5000);
   
  }
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult=(e)=>{
    let cuurentIndex = e.resultIndex;
    let transcript = e.results[cuurentIndex][0].transcript
setPrompt(transcript);
takeCommand(transcript.toLowerCase());
  }
  function takeCommand(command){
if (command.includes("open") && command.includes("youtube")) {
  window.open("https://www.youtube.com", "_blank");
  speak("Opening Youtube");
  setPrompt("Opening Youtube");
  setTimeout(() => {
    setSpeaking(false);
  }, 5000);
}
  else if(command.includes("date")){
    let date =new Date().toLocaleString(undefined,
        {day:"numeric",month:"short",year:"numeric"})
 speak(date)
 setPrompt(`Today's date is ${date}`);
  }
  else if
     (command.includes("open") && command.includes("google")) {
  window.open("https://www.google.com", "_blank");
  speak("Opening Google");
  setPrompt("Opening Google");
  setTimeout(() => {
    setSpeaking(false);
  }, 5000);
}
else if
     (command.includes("open") && command.includes("leetcode")) {
  window.open("https://leetcode.com/u/vanshikatripathii/", "_blank");
  speak("Opening leetcode");
  setPrompt("Opening Leetcode");
  setTimeout(() => {
    setSpeaking(false);
  }, 5000);
}
else if (
    command.includes("birthday") ||
    command.includes("bday") ||
    command.includes("birth day")
  ) {
    let bday = "Vanshika's birthday is on 27th January 2004.";
    speak(bday);
    setPrompt(bday);
    setTimeout(() => {
      setSpeaking(false);
    }, 6000);
  } 
  else if(command.includes("time")){
let time=new Date().toLocaleString(undefined,
{hour:"numeric",minute:"numeric",second:"numeric",hour12:true})
speak(time)
setPrompt(`The time is ${time}`); 
  }
  else if(command.includes("who are you") || command.includes("what can you do")){
    let intro = "I am Vanshika, your personal AI assistant. I can help you with various tasks such as opening websites, telling the date and time, and answering your questions using Google Gemini.";
    speak(intro);
    setPrompt(intro);
    setTimeout(() => {
      setSpeaking(false);
    }, 8000);
  }


  else{
    aiResponse(command)
  }
}
  let value = {
   recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export default UserContext;
