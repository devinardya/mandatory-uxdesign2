import React from 'react';
import './quizpage.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FooterImg from './FooterImg';
import FocusTrap from 'focus-trap-react';
import Header from "./Header";
import Footer from "./Footer";
import QuizSection from "./QuizSection";

const QuizPage = ({ location }) => {
    return <>   
                <HelmetProvider>
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
                </HelmetProvider>
           </>
}

export default QuizPage;