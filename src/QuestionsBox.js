import React, { useEffect, useRef } from 'react';
import './quizpage.css';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

const QuestionBox = ({data, selected, entities, nextQuestion, prevQuestion, currentPage, index, onChange}) => {

    const inputRef = useRef(null);
    
    useEffect( () => {
        inputRef.current.focus();
    },[])

    const onChangeProps = (e) => {
        onChange(e.target.value)
    }

    return <>
            <div className="block__section__questionBox" key={index} >
                <h3>{data.question.replace(/&#?\w+;/g, match => entities[match])}</h3>
                <form className="block__section__questionBox-answers" >
                    {data.answers.map((answer, idx)=> {
                        return <label className={selected === answer ? "block__section__questionBox-answers-indiv-checked" : "block__section__questionBox-answers-indiv"} 
                                        key={idx}
                                        ref={inputRef} >
                                    <input type="radio" name="answers" checked={selected === answer} value={answer} onChange={onChangeProps}  />
                                    <span className="block__section__questionBox-answers-indiv-fakedisplay"></span>
                                    {answer.replace(/&#?\w+;/g, match => entities[match])}
                                </label>
                    })}
                </form>
            </div>  
        
            <div className="block__section__changePage">
                
                    <button className="block__section__prev" onClick={prevQuestion} disabled={currentPage === 1 ? "disabled" : null }>
                        <MdNavigateBefore 
                            size="24px" 
                            style={{ position: "absolute",
                                    top: "50%",
                                    transform: "translate(-100%, -50%)"
                                    }} 
                        />
                        Prev Question
                    </button>
               
                <button className="block__section__next" onClick={ selected ? nextQuestion : null } >
                    {currentPage === 10 ? "Check Answer" : "Next Question"}
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