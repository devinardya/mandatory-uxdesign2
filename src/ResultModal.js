import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './resultmodal.css';
import FocusTrap from 'focus-trap-react';
import { Redirect } from 'react-router-dom';

const Create = ({ result, 
                  getData, 
                  updateQuizData, 
                  updatePlayerAnswer,
                  updateCurrentPage,
                  updateResultModalStatus
                }) => {
	const [backHome, updateBackHome] = useState(false);

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
        <FocusTrap>
            <div className="block__modalContainer">
                <div className = "block__modalContainer__dialogBox" role="dialog" aria-labelledby="dialog1Title" aria-describedby="dialog1Desc">
                    <h2 id="dialog1Title">{result !== 0 ? "CONGRATULATION" : "OOPPS!!"}</h2>
                    <h5 id="dialog1Desc">You answered</h5>
                    <h1 id="dialog1Desc">{result}/10</h1>
                    <h5 id="dialog1Desc">{result <= 1 ? "question correct" : "questions correct"}</h5>
                    <nav>
                        <button onClick={restartGame}>Play again</button>
                        <button onClick={backToHome}>Back to home</button>
                    </nav>
                </div>
            </div>
        </FocusTrap>,
		document.body
	);
};

export default Create;
