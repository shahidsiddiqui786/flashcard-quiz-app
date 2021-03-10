import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'


export default function Home({ setFlashcards , setIsHome }) {

    const [categories, setCategories] = useState([])


    const categoryEl = useRef()
    const amountEl = useRef()
    const name = useRef()
    const gen = useRef()


    useEffect(() => {
      axios
        .get('https://opentdb.com/api_category.php')
        .then(res => {
          setCategories(res.data.trivia_categories)
        })
    }, [])

    useEffect(() => {
    
    }, [])

    function decodeString(str) {
      const textArea = document.createElement('textarea')
      textArea.innerHTML= str
      return textArea.value
    }

    function handleSubmit(e) {
      e.preventDefault()
      setIsHome(false)
      axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer)
          const options = [
            ...questionItem.incorrect_answers.map(a => decodeString(a)),
            answer
          ]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5)
          }
        }))
      })
    }
 
  return (
   <div className="homepage">
     <div className="home-info">
       <h1>Welcome to quiz app</h1>
       <p>Enter your name, subject you want to test and </p>
       <p>,and amount of question you want to take
       there we go</p>
     </div>
      <form className="header" onSubmit={handleSubmit}>
         <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input type="text" id="name"  defaultValue="guest" ref={name} />
          </div>
         <div className="form-group">
          <label htmlFor="gen">Gender</label>
          <input type="text" id="gen" defaultValue="male" ref={gen} />
        </div>
        <div className="form-group">
          <label htmlFor="category">Select Subject</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div className="form-group">
          <button className="btn">Go</button>
        </div>
      </form>
   </div>
  )
}