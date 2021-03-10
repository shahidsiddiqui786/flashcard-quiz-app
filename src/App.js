import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import Home from './Home';
import './App.css'

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [isHome, setIsHome] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [marks, setMarks] = useState(0);
  const [name, setName] = useState('');
 

  return (
    <>
      {isHome ?
      <Home setFlashcards={setFlashcards} setIsHome={setIsHome} />
      :
        isSubmit ?
           <div className="result-page">hello {name} you got {marks}
             <h1 onClick={() => window.location.reload() }>Retake</h1>
           </div>
          :
          <div className="container">
            <div className="quiz-info">
              <h1>Here you go</h1>
            </div>
            <FlashcardList setMarks={setMarks} flashcards={flashcards} />
            <div className="submit">
              <button onClick={() => setIsSubmit(true)} className="btn">submit</button>
            </div>
          </div> 
       }
    </>
  );
}

export default App;