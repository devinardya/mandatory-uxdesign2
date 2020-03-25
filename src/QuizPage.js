import React from 'react';
import './quizpage.css';
import FooterImg from './FooterImg';
import Header from "./Header";
import Footer from "./Footer";
import QuizSection from "./QuizSection";

const QuizPage = () => {
    return <>
                <main className="block">
                    <Header page="quiz"/>
                    <QuizSection />
                    <Footer />
                </main>
                <FooterImg />
           </>
}

export default QuizPage;