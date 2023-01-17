import {useState} from 'react'
import ResultPage from './ResultPage';

export default function QuizPage({quizData , setMoveToQuizPage, setDifficulty, setCategories}) {
    console.log(quizData)

    const [indexQuestion, setIndexQuestion] = useState(0);
    const [checkCorrectAnswer, setCheckCorrectAnswer] = useState(false)
    const [selectAnswer, setSelectAnswer] = useState(null)
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(false)

    // Decode String 
    const decodeString = (str) => {
        const textArea = document.createElement("textarea")
        textArea.innerHTML = str
        return textArea.value
    }
    // End of Decode String

    // Answer and Question 
    const answer = quizData[indexQuestion].answers.map(answer => {
        return answer
    })
    const question =  quizData[indexQuestion].question
    decodeString(question)

    // Check Answer
    const correctAnswer = quizData[indexQuestion].correct_answer
    const checkAnswer = (a) => {
        setSelectAnswer(a)
        if(a === correctAnswer) setScore(prev => prev + 1)
    }

    const handleSelect = (a) => {
        if(selectAnswer === a && selectAnswer === correctAnswer){
            return "right-answer-active"
        }else if(selectAnswer === a && selectAnswer !== correctAnswer){
            return "wrong-answer-active"
        }else if (a === correctAnswer){
            return "right-answer-active"
        }
    }
    // End of CheckAnswer

    const checkNextQuestion = () => {
        setSelectAnswer(null)
        if(selectAnswer === null) {
            alert("Select your answer")
        }else if(selectAnswer) {
            setIndexQuestion(prev => prev + 1)
        }
         if(indexQuestion > 3) {
            setIndexQuestion(0)
            setResult(prev => !prev)
         }
    }
    console.log(result)
  return (
    <>
        {result ? 
        <ResultPage 
        score={score} 
        setMoveToQuizPage={setMoveToQuizPage}
        setCategories={setCategories}
        setDifficulty={setDifficulty}
        /> : 

        <div className='quiz-container'>
            <div className='score-container'>
                <h3>Your score is {score}/5</h3>
            </div>
            <h2 className='question' key={question}>{question}</h2>
            <div className='answers-container'>
                {
                    answer.map(a => {
                        return <button 
                            key={a} 
                            className={`answer ${selectAnswer && handleSelect(a)}`}
                            disabled={selectAnswer}
                            onClick={() => {
                                checkAnswer(a)
                            }} >{a}</button>
                    })
                }
            </div>
            <button className='next-question-button' onClick={checkNextQuestion}>Next Question</button>
        </div>
          } 
    </>
  )
}
