
import Categories from "../Data/Categories"

export default function Home({quizData, setMoveToQuizPage,categories,difficulty,setDifficulty, setCategories}) {

    const difficultyType = [
        {
            diffType: "Easy",
        },
        {
            diffType: "Medium",
        },
        {
            diffType: "Hard"
        }
]

      // Handle Change
   function handleChangeCategory(event) {
    const {value} = event.target
    setCategories(value)
}
    function handleChangeDifficulty(event) {
        const {value} = event.target
        console.log(value.toLowerCase())
        setDifficulty(value.toLowerCase())
    }
    // End of Handle Change 
    const handleSubmit = (event) => {
        event.preventDefault()
        if(!categories && !difficulty) {
            setMoveToQuizPage(false)
            alert("Choose your Category and Diffyculty")
        }else {
            setMoveToQuizPage(prev => !prev)
        }
        
    }

  return (
        <form className="form-container">
            <select id="select-category" onChange={handleChangeCategory}>
                        <option key="select-categories" label='Select Category'></option>
                {Categories?.map(category => (
                    <>
                       <option 
                            key={category.category}
                            value={category.value}
                       >{category.category}</option>
                    </> 
                    ))}
            </select>
            <select id="select-difficulty" onChange={handleChangeDifficulty}>
                    <option key="select-difficulty" label='Select Difficulty'></option>
                {difficultyType?.map(diff => (
                    <option
                        key={diff.diff}
                        value={diff.diff}
                    >{diff.diffType}</option>
                ))}
            </select>
            <button className="startQuiz-btn" onClick={handleSubmit}>Start Quiz</button>
        </form>
  )
}
