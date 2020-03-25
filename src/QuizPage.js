import React from 'react';
import './quizpage.css';
import FooterImg from './FooterImg';
import Header from "./Header";
import Footer from "./Footer";
import QuizSection from "./QuizSection";

const QuizPage = ({ location }) => {
    return <>
                <main className="block">
                    <Header page="quiz"/>
                    <QuizSection category={location.state.category} />
                    <Footer />
                </main>
                <FooterImg />
           </>
}

export default QuizPage;