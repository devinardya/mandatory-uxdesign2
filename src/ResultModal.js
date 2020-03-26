import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './resultmodal.css';
import { Redirect } from 'react-router-dom';

const Create = ({result, handleModal}) => {
	const [backHome, updateBackHome] = useState(false);

    const backToHome = () => {
        updateBackHome(true)
    }
	

	if(backHome) {
        return <Redirect to="/" />
    }

	return ReactDOM.createPortal(
		<div className="block__modalContainer">
            <div className = "block__modalContainer__dialogBox">
                <h2>CONGRATULATION</h2>
                <h5>You answered</h5>
                <h1>{result}/10</h1>
                <h5>{result === 1 ? "question correct" : "questions correct"}</h5>
                <nav>
                    <button>Play again</button>
                    <button onClick={backToHome}>Back to home</button>
                </nav>
            </div>
		</div>,
		document.body
	);
};

export default Create;
