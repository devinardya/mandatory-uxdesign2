import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { playedGames$, updatePlayedGames, correctPercentage$, correctAnswers$, incorrectAnswers$, updateCorrectAnswersStat, updateIncorrectAnswersStat, updateCorrectPercentage } from './store';
import QuestionBox from './QuestionsBox';
import ResultModal from './ResultModal';

const QuizSection = ({category}) => {

    const [selected, updateSelected] = useState("");
    const [quizData, updateQuizData] = useState([]);
    const [playersAnswer, updatePlayerAnswer] = useState([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [loaderActive, updateLoaderActive] = useState(false);
    const [allCorrectAnswer, updateAllCorrectAnswer] = useState([]);
    const [incorrectAnswerStat, updateIncorrAnsState] = useState(incorrectAnswers$.value);
    const [correctAnswerStat, updateCorrAnsState] = useState(correctAnswers$.value); 
    const [playedGamesStat, updateGames] = useState(playedGames$.value);
    const [correctPercentStat, updateCorrectPercentageStat] = useState(correctPercentage$.value)
    const [resultModalStatus, updateResultModalStatus] = useState(false);
    const [result, updateResult] = useState(0);
    const dataPerPage = 1;
    const inputRef = useRef(null);
    const nextButtonRef = useRef(null);

    // PAGINATION ===========================================
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = quizData.slice(indexOfFirstData, indexOfLastData);
    // ======================================================================================

    // USE EFFECT TO ASSIGN H3 TAG ON FOCUS ===========================================

    useEffect( () => {
        let focusTimeout = setTimeout( () => {
            if(!loaderActive){
                inputRef.current.focus();
            }
        }, 0)
        return () => {
            clearTimeout(focusTimeout);
        }
    },[loaderActive, inputRef]);

    const callingFocus = () => {
        inputRef.current.focus();
    }

    const callingBlur = () => {
        nextButtonRef.current.blur();
    }

    // ONCHANGE FUNCTION TO GET THE SELECTED ANSWER ===========================================

    const onChange = (data) => {
        //console.log(data)
        updateSelected(data)
    }

    // USE EFFECT TO SUBSCRIBE TO LOCAL STORAGE ===========================================

    useEffect(() => {
        const subscribe = playedGames$.subscribe(games => {
            updateGames(games);
        })

        return () => subscribe.unsubscribe();
    }, []);

    useEffect(() => {
        const subscribe = correctAnswers$.subscribe(corrAns => {
            updateCorrAnsState(corrAns);
        })

        return () => subscribe.unsubscribe();
    }, []);

    useEffect(() => {
        const subscribe = incorrectAnswers$.subscribe(inCorrAns => {
            updateIncorrAnsState(inCorrAns);
        })

        return () => subscribe.unsubscribe();
    }, []); 

    useEffect(() => {
        const subscribe = correctPercentage$.subscribe(corrPercent => {
            updateCorrectPercentageStat(corrPercent);
        })

        return () => subscribe.unsubscribe();
    }, []); 


    // FUNCTION TO CHANGE THE LOADER STATUS ===========================================

    const loadingSpinner = useCallback( () => {
        updateLoaderActive(true);
        setTimeout( () => {
            updateLoaderActive(false);
        },3000)
    }, [])
    

    // FUNCTION TO GET THE DATA FROM API ===========================================

    const getData = useCallback( () => {
        
        loadingSpinner();

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
               //console.log(copyData);
                copyData.map( data => {
                return allCorrectAnswer.push(data.correct_answer)
                })

                updateAllCorrectAnswer(allCorrectAnswer);
                updateQuizData(newDocuments);
           
        })
        .catch(error => {
            console.log(error)
        }) 

        return () => {
            
            source.cancel("canceling in cleanup")
        }
    }, [updateQuizData, category, loadingSpinner ])

    // USE EFFECT TO CALL THE GETDATA FUNCTION 1 TIME ===========================================

    useEffect(
        getData, []
    );

    // FUNCTION TO SHUFFLE ALL THE ANSWERS FROM THE API ===========================================

    const shuffle = (array) => {

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    
        return array;
    }


    // FUNCTION TO ACTIVATE THE LOADER RIGHT AWAY THEN THE PAGE LOAD THE FIRST TIME ===========================================

    useEffect( () => {
        loadingSpinner();
    }, [loadingSpinner])

   
    // FUNCTION TO RENDER THE NEXT QUESTION ===========================================
   
     const nextQuestion = () => {

        let copyAnswers = [...playersAnswer]

        copyAnswers.splice(currentPage-1,1,selected)
        updatePlayerAnswer(copyAnswers)

        if(currentPage !== 10){
            updateCurrentPage(currentPage+1);
            callingFocus();
            callingBlur();
        }

        
        updateSelected(playersAnswer[currentPage])
    }


     // FUNCTION TO RENDER THE PREVIOUS QUESTION ===========================================


    const prevQuestion = () => {
        if(currentPage !== 1) {
            updateCurrentPage(currentPage-1);
            callingFocus();
        }
       
        updateSelected(playersAnswer[currentPage-2]);
    }

    // FUNCTION TO CHECK PLAYER'S ANSWER AND SAVE ALL THE STATS INTO THE LOCAL STORAGE ===========================================

    const checkAnswer = () => {

        //console.log(selected)
        let copyAnswers = [...playersAnswer, selected]
        //console.log(copyAnswers)
        
      
        const resultCorrectAnswer = allCorrectAnswer.filter(element => copyAnswers.includes(element));
        updateResult(resultCorrectAnswer.length);

        // SAVING DATA TO LOCAL STORAGE
            // CORRECT ANSWER STAT
        let copyCorrAns = correctAnswerStat;
        copyCorrAns += resultCorrectAnswer.length;
        updateCorrectAnswersStat(copyCorrAns);

            // INCORRECT ANSWER STAT  
       
        let copyInCorrAns = incorrectAnswerStat;
        let iTemp = 10 - resultCorrectAnswer.length;
        copyInCorrAns += parseInt(iTemp);
        updateIncorrectAnswersStat(copyInCorrAns);

            // GAME STAT
        //console.log(playedGamesStat);  
        let copyPlayedGames = playedGamesStat;
        copyPlayedGames++;
        updatePlayedGames(copyPlayedGames)

            // CORRECT PERCENTAGE
        //console.log(correctPercentStat);  
        let copyCorrPercent = correctPercentStat;
        copyCorrPercent = ((copyCorrAns / (copyPlayedGames*10)) * 100)
        updateCorrectPercentage(Math.round(copyCorrPercent))

        updateResultModalStatus(true);

    }

     // RENDER THE COMPONENT ===========================================

    return <section className = "block__section">
                {loaderActive ? 
                    <Loader className="loader"
                        type="Oval"
                        color="#D56F85"
                        height={100}
                        width={100}
                        timeout={5000}

                    /> 
                        : 
                    <>
                    <h4>CATEGORY: {category.toUpperCase()}</h4>
                    <h5>{currentPage} / 10</h5>
                    {currentData.map((data, index) => {
                        const entities = {
                            "&#039;": "'",
                            "&quot;": '"',
                            "&ntilde;": "ñ",
                            "&eacute;": "é",
                            "&amp;": "&",
                            "&uuml;": "ü",
                            "&ldquo;" : "“",
                            "&hellip;": "…",
                            "&rdquo;" : "”",
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
                                inputRef = {inputRef}
                                nextButtonRef = {nextButtonRef}
                                
                            />
                        )
                        
                         })
                        }
                        { resultModalStatus && <ResultModal result={result} 
                                                        getData={getData}
                                                        updateQuizData = {updateQuizData}
                                                        updatePlayerAnswer = {updatePlayerAnswer}
                                                        updateCurrentPage = {updateCurrentPage}
                                                        updateResultModalStatus = {updateResultModalStatus}
                                                        resultModalStatus = {resultModalStatus}
                                                        />}
                        </>
                }
            </section>
}

export default QuizSection;