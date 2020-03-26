import React from 'react';
import './quizpage.css';
import { Helmet } from 'react-helmet';
import FooterImg from './FooterImg';
import FocusTrap from 'focus-trap-react';
import Header from "./Header";
import Footer from "./Footer";
import QuizSection from "./QuizSection";

const QuizPage = ({ location }) => {
    return <>   
                <Helmet>
                    <title>Quiz Master - Category: {location.state.category}</title>
                </Helmet>
                <FocusTrap>
                    <main className="block">
                        <Header page="quiz"/>
                        <QuizSection category={location.state.category} />
                        <Footer />
                    </main>
                </FocusTrap>
                <FooterImg />
           </>
}

export default QuizPage;