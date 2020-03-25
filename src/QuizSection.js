import React, { useState } from 'react';
import axios from 'axios';

const QuizSection = () => {

    const [selected, updateSelected] = useState("");

    const onChange = (e) => {
        console.log(e.target.value)
        updateSelected(e.target.value)
        
    }


    return <section className = "block__section">
                <h3>Choose one from three categories below and see how many correct answers you can get out of 10 questions!</h3>
                
            </section>
}

export default QuizSection;