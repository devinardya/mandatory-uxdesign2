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
    const [correctAnswer, updateCorrectAnswer] = useState([]);
    const [incorrectAnswerStat, updateIncorrAnsState] = useState(incorrectAnswers$.value);
    const [correctAnswerStat, updateCorrAnsState] = useState(correctAnswers$.value); 
    const [playedGamesStat, updateGames] = useState(playedGames$.value);
    const [correctPercentStat, updateCorrectPercentageStat] = useState(correctPercentage$.value)
    const [resultModalStatus, updateResultModalStatus] = useState(false);
    const [result, updateResult] = useState(0);
    const dataPerPage = 1;
    const inputRef = useRef(null);

  //PAGINATION ===========================================
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = quizData.slice(indexOfFirstData, indexOfLastData);
    // ======================================================================================

    useEffect( () => {
        inputRef.current.focus();
    },[])

    const onChange = (data) => {
        console.log(data)
        updateSelected(data)
        
    }

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
            console.log('woho, i am here', inCorrAns)
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
               console.log(copyData);
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

     const nextQuestion = () => {

        let copyAnswers = [...playersAnswer]

        copyAnswers.splice(currentPage-1,1,selected)
        updatePlayerAnswer(copyAnswers)

        if(currentPage !== 10){
            updateCurrentPage(currentPage+1)
        }
        updateSelected(playersAnswer[currentPage])
    }

    const checkAnswer = () => {
          //console.log("checking answers!")
          console.log('roaor')
        //console.log(playersAnswer)
        const resultCorrectAnswer = correctAnswer.filter(element => playersAnswer.includes(element));
        //console.log(resultCorrectAnswer)
        updateResult(resultCorrectAnswer.length);
        console.log("correct answer stat")

        // SAVING DATA TO LOCAL STORAGE
            // CORRECT ANSWER STAT
        let copyCorrAns = correctAnswerStat;
        copyCorrAns += resultCorrectAnswer.length;
        updateCorrectAnswersStat(copyCorrAns);
        console.log('roaor3')

            // INCORRECT ANSWER STAT  
       
        let copyInCorrAns = incorrectAnswerStat;
        let iTemp = 10 - resultCorrectAnswer.length;
        copyInCorrAns += parseInt(iTemp);
        updateIncorrectAnswersStat(copyInCorrAns);
        console.log('roaor3')

            // GAME STAT
        console.log(playedGamesStat);  
        let copyPlayedGames = playedGamesStat;
        copyPlayedGames++;
        updatePlayedGames(copyPlayedGames)
        console.log('roaor4')

            // CORRECT PERCENTAGE
        console.log(correctPercentStat);  
        let copyCorrPercent = correctPercentStat;
        copyCorrPercent = ((copyCorrAns / (copyPlayedGames*10)) * 100)
        updateCorrectPercentage(Math.round(copyCorrPercent))

        updateResultModalStatus(true);
        console.log('roaor5')

    }


    const prevQuestion = () => {
        if(currentPage !== 1) {
            updateCurrentPage(currentPage-1)
        }
       
        updateSelected(playersAnswer[currentPage-2])
    }


    return <>
            {loaderActive ? <Loader
                type="Oval"
                color="#D56F85"
                height={100}
                width={100}
                timeout={5000}

                style={{position:"absolute", top: "40%"}}
                /> : 
                <section className = "block__section">
                    <h4 ref={inputRef}>CATEGORY: {category.toUpperCase()}</h4>
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
                              
                            />
                        )
                })}
                { resultModalStatus && <ResultModal result={result} 
                                                   getData={getData}
                                                   updateQuizData = {updateQuizData}
                                                   updatePlayerAnswer = {updatePlayerAnswer}
                                                   updateCurrentPage = {updateCurrentPage}
                                                   updateResultModalStatus = {updateResultModalStatus}
                                                   />}
            </section>
            }
        </>
}

export default QuizSection;