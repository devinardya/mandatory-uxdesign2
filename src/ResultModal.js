import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-loader-spinner'
import './resultmodal.css';
import FocusTrap from 'focus-trap-react';
import { Redirect } from 'react-router-dom';

const Create = ({ result, 
                  getData, 
                  updateQuizData, 
                  updatePlayerAnswer,
                  updateCurrentPage,
                  updateResultModalStatus,
                }) => {
    const [backHome, updateBackHome] = useState(false);
    const [loadingLoader, updateLoadingLoader] = useState(true);

    useEffect( () => {
        const timer = setTimeout( () => {
            updateLoadingLoader(false)
        }, 1000)

        return () => {
            clearTimeout(timer);
        }
    }, []);


    const backToHome = () => {
        updateBackHome(true);
    }

    const restartGame = () => {
        updateCurrentPage(1);
        updateQuizData([]);
        updatePlayerAnswer([]);
        updateResultModalStatus(false);
        getData();
    }
	

	if(backHome) {
        return <Redirect to="/" />
    }

	return ReactDOM.createPortal(
        
            <div className="block__modalContainer">
                {loadingLoader ? 
                    <Loader
                        type="Oval"
                        color="#D56F85"
                        height={100}
                        width={100}
                        timeout={3000}
                    />
                    :
                    <FocusTrap>
                        <div className = "block__modalContainer__dialogBox" role="dialog" aria-labelledby="dialog1Title" aria-describedby="dialog1Desc">
                            <h2 id="dialog1Title">{result !== 0 ? "CONGRATULATION" : "OOPPS!!"}</h2>
                            <h5 id="dialog1Desc">You answered</h5>
                            <h1 id="dialog1Desc">{result}/10</h1>
                            <h5 id="dialog1Desc">{result <= 1 ? "question correct" : "questions correct"}</h5>
                            <nav className="block__modalContainer--nav">
                                <button aria-label="play again" onClick={restartGame}>Play again</button>
                                <button aria-label="back to home" onClick={backToHome}>Back to home</button>
                            </nav>
                        </div>
                    </FocusTrap>
                }
            </div>
        ,
		document.body
	);
};

export default Create;
