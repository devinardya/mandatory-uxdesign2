import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MdNavigateNext } from 'react-icons/md';

const QuizSection = ({category}) => {

    const [selected, updateSelected] = useState("");
    const [quizData, updateQuizData] = useState([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const dataPerPage = 1;
    

    const onChange = (e) => {
        console.log(e.target.value)
        updateSelected(e.target.value)
        
    }

    const getData = useCallback( () => {
        let cat;
        if(category === "music") {
            cat = 12;
        } else if (category === "books") {
            cat = 10;
        } else if (category === "movie") {
            cat = 11;
        }


        axios.get("https://opentdb.com/api.php?amount=10&category="+cat+"&difficulty=hard&type=multiple")
        .then(response => {
            //console.log(response.data.results);
      
            let copyData = [...response.data.results];
            console.log(copyData)
            let newDocuments = [];
   
            copyData.map(data => {
                //console.log(data.incorrect_answers)
                let answers = [...data.incorrect_answers, data.correct_answer];
                let newAnswers = shuffle(answers);

                let newData = {
                    answers:  newAnswers,
                    ...data,
                }
    
                return newDocuments.push(newData);
            })

                updateQuizData(newDocuments);
            
        }) 
    }, [updateQuizData, category ])

   useEffect(
        getData, []
    );
    
    const shuffle = (array) => {

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    
        return array;
    }

    const nextQuestion = () => {
        updateCurrentPage(currentPage+1)
      }

    const prevQuestion = () => {
        if(currentPage !== 1) {
            updateCurrentPage(currentPage-1)
        }
    }

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = quizData.slice(indexOfFirstData, indexOfLastData);

    return <section className = "block__section">
                <h4>CATEGORY: {category.toUpperCase()}</h4>
                {currentData.map((data, index) => {
                    console.log(currentData);
                    
                    const entities = {
                        "&#039;": "'",
                        "&quot;": '"',
                        "&ntilde;": "ñ",
                        "&eacute;": "é",
                        "&amp;": "&",
                        "&uuml;": "ü"
                    };

                    

                    return <div className="block__section__questionBox" key={index}>
                                <h3>{data.question.replace(/&#?\w+;/g, match => entities[match])}</h3>
                                <div className="block__section__questionBox-answers">
                                    {data.answers.map((answer, idx)=> {
                                        return <label className={selected === answer ? "block__section__questionBox-answers-indiv-checked" : "block__section__questionBox-answers-indiv"} 
                                                        key={idx} >
                                                    <input type="radio" name="answers" checked={selected === answer} value={answer} onChange={onChange}  />
                                                    <span className="block__section__questionBox-answers-indiv-fakedisplay"></span>
                                                    {answer}
                                                </label>
                                    })}
                                </div>
                            </div>  
                })}
                <div className="block__section__changePage">
                    <button className="block__section__prev" onClick={prevQuestion}>
                        Prev question
                    </button>
                    <button className="block__section__next" onClick={nextQuestion}>
                        Next question 
                        <MdNavigateNext 
                            size="24px" 
                            style={{ position: "absolute",
                                     top: "50%",
                                     transform: "translate(0, -50%)"
                                    }} />
                    </button>
                </div>  
            </section>
}

export default QuizSection;