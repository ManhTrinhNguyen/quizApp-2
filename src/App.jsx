import {useEffect, useState}from 'react'
import Categories from './Data/Categories'


export default function App() {

    const [quizData, setQuizData] = useState([])
    const [categories, setCategories] = useState(null)
    const [difficulty, setDifficulty] = useState(null)

    const difficultyType = [
        {
            diffType: "Easy",
        },
        {
            diffType: "Medium",
        },
        {
            diffType: "Difficult"
        }
]

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

   function handleChangeCategory(event) {
    const {value} = event.target
    setCategories(value)
   }
   function handleChangeDifficulty(event) {
    const {value} = event.target
    console.log(value.toLowerCase())
    setDifficulty(value.toLowerCase())
   }

   console.log(quizData)
  return (
    <div>
        <form>
            <h1>Contact Form</h1>
            <select id="select-category" onChange={handleChangeCategory}>
                {Categories?.map(category => (
                       <option 
                            key={category.category}
                            value={category.value}
                       >{category.category}</option>
                    ))}
            </select>
            <select id="select-difficulty" onChange={handleChangeDifficulty}>
                {difficultyType?.map(diff => (
                    <option
                        key={diff.diff}
                        value={diff.diff}
                    >{diff.diffType}</option>
                ))}
            </select>
            <button>Start Quiz</button>
        </form>
    </div>
  )
}
