import React, { useState, useRef, useEffect } from 'react';
import './about.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FooterImg from './FooterImg';
import AboutImg from './design/about-illustration.svg';
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from './Sidebar';


const About = () => {

    const [sidebarIsOpen, updateSidebarIsOpen] = useState(false);
    const aboutRef = useRef(null);

    useEffect( () => {
        aboutRef.current.focus();
    }, [aboutRef])


    return <>   
                <HelmetProvider>
                    <Helmet>
                        <title>Quiz Master - About</title>
                    </Helmet>
                        <main className="block">
                            <Header page="about"
                                    onClickMenuButton={() => updateSidebarIsOpen(true)}
                            />
                            <Sidebar onClose={() => updateSidebarIsOpen(false)} isOpen={sidebarIsOpen} />
                            <section className="block__about">
                                <figure>
                                    <img src={AboutImg} alt="a woman with question marks" />
                                </figure>
                                <article ref={aboutRef} tabIndex="0" aria-label="About quiz master" aria-labelledby="aboutText" aria-describedby="aboutText2">
                                    <p id="aboutText">Quiz Master is a trivia game for a programming project that was created by Devina Paramita Na using ReactJS and open API from opentdb.com for the trivia questions. The Open Trivia Database provides a completely free JSON API for use in programming projects.</p>
                                    <p id="aboutText2">The vector illustrations used in this project are using free license from Freepik, such as: </p>
                                    <ol id="aboutText2">
                                        <li>
                                        <a aria-label="question mark icon designed by rawpixel" href="http://www.freepik.com">QuestionMark People is Designed by rawpixel.com / Freepik</a>
                                        </li>
                                        <li>
                                        <a aria-label="radio illustration icon designed by rawpixel" href="http://www.freepik.com">Radio illustration is Designed by rawpixel.com / Freepik</a>
                                        </li>
                                        <li>
                                        <a aria-label="books illustration icon designed by rawpixel" href="http://www.freepik.com">Books illustration is Designed by rawpixel.com / Freepik</a>
                                        </li>
                                        <li>
                                        <a aria-label="movie illustration icon designed by gstudioimagen" href="http://www.freepik.com">Movie illustration is Designed by gstudioimagen / Freepik</a>
                                        </li>
                                    </ol>
                                    </article>
                            </section>
                            <Footer />
                        </main>
                    <FooterImg />
                </HelmetProvider>
           </>
}

export default About;