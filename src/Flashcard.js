import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ countGalat, countSahi, setCountGalat, setCountSahi, flashcard }) {
  const [flipSahi, setFlipSahi] = useState(false)
  const [flipGalat, setFlipGalat] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  function handleclicksahi() {
     setFlipSahi(true);
     setCountSahi(countSahi+1)
  }

  function handleclickgalat() {
    setFlipGalat(true)
    setCountGalat(countGalat+1)
  }

  

  return (
    <div
      className={`card ${flipSahi ? 'flipsahi' : ''} ${flipGalat ? 'flipgalat' : ''}`}
      style={{ height: height }}
      
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map(option => {
            return <div onClick={() => option === flashcard.answer ? handleclicksahi() : handleclickgalat() } className="flashcard-option" key={option}>{option}</div>
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
  )
}