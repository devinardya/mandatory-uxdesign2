import React from 'react';
import './about.css';
import { Helmet } from 'react-helmet';
import FooterImg from './FooterImg';
import FocusTrap from 'focus-trap-react';
import Header from "./Header";
import Footer from "./Footer";


const About = ({ location }) => {
    return <>   
                <Helmet>
                    <title>Quiz Master - About</title>
                </Helmet>
                <main className="block">
                    <Header page="quiz"/>
                    <section className="block__about">
                        <h2>About Quiz Master</h2>
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
                            <p>Cheese strings emmental pecorino. Gouda cauliflower cheese fromage frais danish fontina halloumi swiss everyone loves pepper jack. Macaroni cheese cheese strings port-salut swiss parmesan cheese on toast blue castello brie. Mascarpone who moved my cheese say cheese cut the cheese hard cheese paneer red leicester parmesan. Jarlsberg stinking bishop fromage chalk and cheese fondue blue castello halloumi lancashire. Cheese and biscuits camembert de normandie everyone loves brie fondue rubber cheese cheese slices cut the cheese. Goat cheesy feet brie bavarian bergkase.</p>
                        </article>
                    </section>
                    <Footer />
                </main>
                <FooterImg />
           </>
}

export default About;