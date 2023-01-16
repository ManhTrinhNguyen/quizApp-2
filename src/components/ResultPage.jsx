import React from 'react'

export default function ResultPage({score, setMoveToQuizPage}) {

    function playAgain () { 
        setMoveToQuizPage(false)
    }
  return (
        <div className='result-container'>
            <h1>Congratulation your score is {score}/5</h1>
            <button className='playAgian-btn' onClick={playAgain}>Play Agian</button>
        </div> 
  )
}
