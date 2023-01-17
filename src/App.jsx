import {useEffect, useState}from 'react'
import QuizPage from './components/QuizPage'
import "./styles.css"

import Home from './components/Home'

export default function App() {

    const [quizData, setQuizData] = useState([])
    const [categories, setCategories] = useState(null)
    const [difficulty, setDifficulty] = useState(null)
    const [moveToQuizPage, setMoveToQuizPage] = useState(false)

    
    // Fetch Function 
    const fetchFunc = () => {
        fetch(`https://opentdb.com/api.php?amount=5&category=${categories}&difficulty=${difficulty}&type=multiple`)
        .then(res => res.json())
        .then(data => {
            const formattedData = data.results.map(quiz => {
                //console.log(quiz)
                const inCorrectAnswerLength = quiz.incorrect_answers.length
                const randomNumber = Math.floor(Math.random() * (inCorrectAnswerLength + 1))
                quiz.incorrect_answers.splice(randomNumber, 0, quiz.correct_answer)
                return {
                    ...quiz, 
                    answers: quiz.incorrect_answers,
                }
                
            })
            setQuizData(formattedData)
        })
        .catch(err => console.log(err))
    }
    // End of Fetch function 

    
    // UseEffect
    useEffect(() => {
        fetchFunc()
    }, [categories, difficulty]);
    // End of useEffect

   //console.log(quizData)
  return (
    <div className='app'>
        <h1 className='title'>Trival Quizz</h1>
        {moveToQuizPage ?
         <QuizPage 
         quizData={quizData}
         setMoveToQuizPage={setMoveToQuizPage}
         setCategories={setCategories}
         setDifficulty={setDifficulty}
         />
         : 
        <Home 
            quizData={quizData}
            setMoveToQuizPage={setMoveToQuizPage}
            categories={categories}
            setCategories={setCategories}
            difficulty={difficulty} 
            setDifficulty={setDifficulty}/>
        }
        
    </div>
  )
}
