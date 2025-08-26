
import React, { useContext } from 'react';
import "./App.css";
import va from "./assets/ai.png";
import { FaMicrophone } from "react-icons/fa";
import { DataContext } from './context/UserContext';
import speakGif from "./assets/speak.gif"; 
import aigif from "./assets/aiVoice.gif"; 
function App() {
  let { recognition, speaking, setSpeaking,prompt,response,setPrompt,setResponse} = useContext(DataContext);

  return (
    <div className='main'>
      <img src={va} alt="AI Assistant" id="Vanshika" />
      <span>I AM NEXA, Your advanced Virtual Assistant</span>

      {!speaking ? (
        <button
          onClick={() => {
            setPrompt("Listening...");
            setSpeaking(true);
            setResponse(false)
            recognition.start();
          }}
        >
          Click Here <FaMicrophone />
        </button>
      ) : (
        <div className='response'>
          {!response ?<img src={speakGif} alt="Listening..." id="speak" />
           :
          <img src={aigif} alt="Listening..." id="aigif" /> }
          
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
