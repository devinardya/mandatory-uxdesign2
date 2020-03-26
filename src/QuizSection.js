import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import QuestionBox from './QuestionsBox';
import ResultModal from './ResultModal';

const QuizSection = ({category}) => {

    const [selected, updateSelected] = useState("");
    const [quizData, updateQuizData] = useState([]);
    const [playersAnswer, updatePlayerAnswer] = useState([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [loaderActive, updateLoaderActive] = useState(false);
    const [correctAnswer, updateCorrectAnswer] = useState([]);
    const [resultModalStatus, updateResultModalStatus] = useState(false);
    const [result, updateResult] = useState(0);
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

        let url = "https://opentdb.com/api.php?amount=10&category="+cat+"&difficulty=medium&type=multiple";
        
        let source = axios.CancelToken.source();

        axios.get( url,
                   {cancelToken: source.token} 
                   )
        .then(response => {
            updateLoaderActive(true);
            setTimeout( () => {
                let copyData = [...response.data.results];
            
                let newDocuments = [];
                let allCorrectAnswer = [];

                copyData.map(data => {
                    //console.log(data.incorrect_answers)
                    let answers = [...data.incorrect_answers, data.correct_answer];
                    let newAnswers = shuffle(answers);

                    let newData = {
                        answers: newAnswers,
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
        })
        .catch(error => {
            console.log(error)
        }) 

        return () => {
            
            source.cancel("canceling in cleanup")
        }
    }, [updateQuizData, category ])

   useEffect(
        getData, []
    );

    useEffect( () => {
        activateLoader(true);
        const activeLoad = setTimeout( () => {
            activateLoader(false);
        },3000)

        return () => {
            clearTimeout(activeLoad);
        }
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
   
        console.log("checking answers!")
        console.log(playersAnswer)
        const resultCorrectAnswer = correctAnswer.filter(element => data.includes(element));
        console.log(resultCorrectAnswer)
        updateResult(resultCorrectAnswer.length)

    }, [playersAnswer, correctAnswer])


     const nextQuestion = () => {

        console.log("ITS ON NEXT");
        let copyAnswers = [...playersAnswer]

        copyAnswers.splice(currentPage-1,1,selected)
        updatePlayerAnswer(copyAnswers)

        if(currentPage !== 10){
            updateCurrentPage(currentPage+1)
        }
        updateSelected(playersAnswer[currentPage])
    }

    useEffect(() => {

    if (currentPage === 10) {
        checkAnswer(playersAnswer);
    }
    
    }, [playersAnswer, checkAnswer, currentPage])

    useEffect( () => {
        if(playersAnswer.length === 10) {
        updateResultModalStatus(true);
        }
    }, [playersAnswer.length])
  

    const prevQuestion = () => {
        if(currentPage !== 1) {
            updateCurrentPage(currentPage-1)
        }
        console.log(playersAnswer, currentPage-2)
        updateSelected(playersAnswer[currentPage-2])
    }

    //PAGINATION ===========================================
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = quizData.slice(indexOfFirstData, indexOfLastData);
    // ======================================================================================

    return <>
            {loaderActive ? <Loader
                type="CradleLoader"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000}
                /> : 
                <section className = "block__section">
                    <h4>CATEGORY: {category.toUpperCase()}</h4>
                    {currentData.map((data, index) => {
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
                {resultModalStatus && <ResultModal result={result} />}
            </section>
            }
        </>
}

export default QuizSection;