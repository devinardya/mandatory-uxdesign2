import React from 'react';
import './quizpage.css';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

const QuestionBox = ({ data, 
                       selected, 
                       entities, 
                       nextQuestion, 
                       prevQuestion, 
                       currentPage, 
                       index, 
                       onChange, 
                       checkAnswer, 
                       inputRef,
                       nextButtonRef,
                    }) => {

    const onChangeProps = (e) => {
        onChange(e.target.value)
    }


    return <>
            <div className="block__section__questionBox" key={index} >
                <h3 ref={inputRef} tabIndex="0">{data.question.replace(/&#?\w+;/g, match => entities[match])}</h3>
                <form className="block__section__questionBox-answers" >
                    {data.answers.map((answer, idx)=> {
                        return <label className={selected === answer ? "block__section__questionBox-answers-indiv-checked" : "block__section__questionBox-answers-indiv"} 
                                        key={idx}
                                         >
                                    <input type="radio" 
                                           name="answers" 
                                           checked={selected === answer} 
                                           value={answer} 
                                           onChange={onChangeProps}
                                           aria-label={answer.replace(/&#?\w+;/g, match => entities[match])}    
                                           />
                                    <span className="block__section__questionBox-answers-indiv-fakedisplay"></span>
                                    {answer.replace(/&#?\w+;/g, match => entities[match])}
                                </label>
                    })}
                </form>
            </div>  
        
            <div className="block__section__changePage">
                
                    <button className="block__section__prev" 
                            aria-label="previous question"
                            onClick={prevQuestion} 
                            disabled={currentPage === 1 ? "disabled" : null }>
                        <MdNavigateBefore 
                            size="24px" 
                            style={{ position: "absolute",
                                    top: "50%",
                                    transform: "translate(-100%, -50%)"
                                    }} 
                        />
                        Prev Question
                    </button>
               
                <button ref={nextButtonRef} className="block__section__next" 
                        aria-label={currentPage === 10 ? "Check Result" : "Next Question"}
                        onClick={ selected ? currentPage === 10 ? checkAnswer : nextQuestion : null }
                        >
                    {currentPage === 10 ? "Check Result" : "Next Question"}
                    <MdNavigateNext 
                        size="24px" 
                        style={{ position: "absolute",
                                top: "50%",
                                transform: "translate(0, -50%)"
                                }} />
                </button>
             </div> 
          </> 
}

export default QuestionBox;