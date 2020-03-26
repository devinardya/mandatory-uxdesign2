import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import QuestionBox from './QuestionsBox';

const QuizSection = ({category}) => {

    const [selected, updateSelected] = useState("");
    const [quizData, updateQuizData] = useState([]);
    const [playersAnswer, updatePlayerAnswer] = useState([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [loaderActive, updateLoaderActive] = useState(false);
   /*  const [rightAnswer, updateRightAnswer] = useState(0); */
    const [correctAnswer, updateCorrectAnswer] = useState([]);
    const dataPerPage = 1;
    

    const onChange = (data) => {
        console.log(data)
        updateSelected(data)
        
    }

    const activateLoader = (status) => {
        updateLoaderActive(status);
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
            updateLoaderActive(true);
            setTimeout( () => {
                let copyData = [...response.data.results];
            console.log(copyData)
            let newDocuments = [];
            let allCorrectAnswer = [];

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

            copyData.map( data => {
               return allCorrectAnswer.push(data.correct_answer)
            })

                updateCorrectAnswer(allCorrectAnswer);
                updateLoaderActive(false);
                updateQuizData(newDocuments);
            }, 2000)
            //console.log(response.data.results);  
        }) 
    }, [updateQuizData, category ])

   useEffect(
        getData, []
    );

    useEffect( () => {
        activateLoader(true);
        setTimeout( () => {
            activateLoader(false);
        },3000)
    }, [])
    
    const shuffle = (array) => {

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    
        return array;
    }

   

    const checkAnswer = useCallback( (data) => {
        /* let copyAnswers = [...playersAnswer]
            if(!copyAnswers.includes(selected)) {
                updatePlayerAnswer([...copyAnswers, selected])
            }  
 */
        console.log("checking answers!")
        console.log(playersAnswer)
        const intersection = correctAnswer.filter(element => data.includes(element));
        console.log(intersection)
    }, [playersAnswer, correctAnswer])

 
     const nextQuestion = () => {

        console.log("ITS ON NEXT");
        
           

            let copyAnswers = [...playersAnswer]
            if(!copyAnswers.includes(selected)) {
                updatePlayerAnswer([...playersAnswer, selected])
                console.log(playersAnswer)
            }  
            //updatePlayerAnswer([...copyAnswers, selected])
            if(currentPage !== 10){
                updateCurrentPage(currentPage+1)
            }

            
    
           
      }

      useEffect(() => {
        console.log({playersAnswer})
        if (currentPage === 10) {
            checkAnswer(playersAnswer);
        }
       
      }, [playersAnswer, checkAnswer, currentPage])

  

    const prevQuestion = () => {
        if(currentPage !== 1) {
            updateCurrentPage(currentPage-1)
        }
    }

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = quizData.slice(indexOfFirstData, indexOfLastData);
/*     console.log(rightAnswer)
    console.log(correctAnswer) */

    return <>
            {loaderActive ? <Loader
                type="CradleLoader"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
                /> : 
                <section className = "block__section">
                    <h4>CATEGORY: {category.toUpperCase()}</h4>
                    {currentData.map((data, index) => {
                        //console.log(currentData);
                        const entities = {
                            "&#039;": "'",
                            "&quot;": '"',
                            "&ntilde;": "ñ",
                            "&eacute;": "é",
                            "&amp;": "&",
                            "&uuml;": "ü"
                        };
                        return (
                            <QuestionBox 
                                key= {index}
                                entities = {entities}
                                data = {data}
                                index = {index}
                                selected = {selected}
                                prevQuestion = {prevQuestion}
                                nextQuestion = {nextQuestion}
                                currentPage = {currentPage}
                                onChange = {onChange}
                                checkAnswer = {checkAnswer}
                                playersAnswer= {playersAnswer}
                            />
                        )
                })}
            </section>
            }
        </>
}

export default QuizSection;