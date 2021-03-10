import React, { useState } from 'react'
import Flashcard from './Flashcard';

export default function FlashcardList({ setMarks, flashcards }) {
   const [countSahi, setCountSahi] = useState(0);
   const [countGalat, setCountGalat] = useState(0);
   
   function countMarks() {
       let s = countSahi;
       let t = countGalat+countSahi;
       let m = (Number(s)/Number(t))* 100
       setMarks(m);
   }

  return (
    <div className="card-grid">
      {flashcards.map(flashcard => {
        return <Flashcard countGalat={countGalat} countSahi={countSahi} setCountGalat={setCountGalat} setCountSahi={setCountSahi} flashcard={flashcard} key={flashcard.id} />
      })
      }
      {
        countMarks()
      }
    </div>
  )
}