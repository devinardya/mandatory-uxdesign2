import React, { useState } from 'react';
import './quizpage.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FooterImg from './FooterImg';
import FocusTrap from 'focus-trap-react';
import Header from "./Header";
import Footer from "./Footer";
import QuizSection from "./QuizSection";
import Sidebar from './Sidebar';

const QuizPage = ({ location }) => {

    const [sidebarIsOpen, updateSidebarIsOpen] = useState(false);

    return <>   
                <HelmetProvider>
                    <Helmet>
                        <title>Quiz Master - Category: {location.state.category}</title>
                    </Helmet>
                    <FocusTrap>
                        <main className="block" >
                            <Header page="quiz"
                                    onClickMenuButton={() => updateSidebarIsOpen(true)}
                            />
                            <Sidebar onClose={() => updateSidebarIsOpen(false)} isOpen={sidebarIsOpen} />
                            <QuizSection category={location.state.category} />
                            <Footer />
                        </main>
                    </FocusTrap>
                    <FooterImg />
                </HelmetProvider>
           </>
}

export default QuizPage;