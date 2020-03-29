import React, { useState } from 'react';
import './about.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FooterImg from './FooterImg';
import AboutImg from './design/about-illustration.svg';
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from './Sidebar';


const About = () => {

    const [sidebarIsOpen, updateSidebarIsOpen] = useState(false);

    return <>   
                <HelmetProvider>
                    <Helmet>
                        <title>Quiz Master - About</title>
                    </Helmet>
                    <main className="block">
                         <Header page="about"
                                 onClickMenuButton={() => updateSidebarIsOpen(true)}
                         />
                         <Sidebar onClickMask={() => updateSidebarIsOpen(false)} isOpen={sidebarIsOpen} />
                        <section className="block__about">
                            <figure>
                                <img src={AboutImg} alt="about page illustration" />
                            </figure>
                            <article>
                                <p>Quiz Master is a trivia game using open API from opentdb.com. The Open Trivia Database provides a completely free JSON API for use in programming projects.</p>
                                <p>The vector illustrations used in this project are using free license from Freepik, such as: </p>
                                <ul>
                                    <li>
                                    <p>QuestionMark People is <a href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a></p>
                                    </li>
                                    <li>
                                    <p>Radio illustration is <a href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a></p>
                                    </li>
                                    <li>
                                    <p>Books illustration is <a href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a></p>
                                    </li>
                                    <li>
                                    <p>Movie illustration is <a href="http://www.freepik.com">Designed by gstudioimagen / Freepik</a></p>
                                    </li>
                                </ul>
                                </article>
                        </section>
                        <Footer />
                    </main>
                    <FooterImg />
                </HelmetProvider>
           </>
}

export default About;