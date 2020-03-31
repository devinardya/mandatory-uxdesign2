import React, { useState } from 'react';
import './stats.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PieChart from 'react-minimal-pie-chart';
import FooterImg from './FooterImg';
import { playedGames$, correctPercentage$, correctAnswers$, incorrectAnswers$ } from './store';
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from './Sidebar';


const Stats = () => {

    const [sidebarIsOpen, updateSidebarIsOpen] = useState(false);

    const clearStat = () => {
        localStorage.clear();
        window.location.reload();
    }

    return <>   
                <HelmetProvider>
                    <Helmet>
                        <title>Quiz Master - Stats</title>
                    </Helmet>
                    <main className="block">
                         <Header page="stats"
                                 onClickMenuButton={() => updateSidebarIsOpen(true)}
                         />
                         <Sidebar onClose={() => updateSidebarIsOpen(false)} isOpen={sidebarIsOpen} />
                        <section className="block__stats">
                            <div className="block__stats__mainBox">
                                <article className="block__stats__mainBox--statsBox">
                                    <h4>Game Played</h4>
                                    <p>{playedGames$.value}</p>
                                    <h4>Correct Answers</h4>
                                    <p>{correctAnswers$.value}</p>
                                    <h4>Incorrect Answers</h4>
                                    <p>{incorrectAnswers$.value}</p>
                                </article>
                                <article className="block__stats__mainBox--percentageBox">
                                    <div className="block__stats__mainBox--percentageBox--pieChart">
                                        <PieChart
                                                animate={true}
                                                animationDuration={1500}
                                                animationEasing="ease-out"
                                                cx={50}
                                                cy={50}
                                                data={[
                                                {
                                                    color: '#D56F85',
                                                    title: 'One',
                                                    value: parseInt(correctPercentage$.value)
                                                },
                                                {
                                                    color: '#dddddd',
                                                    title: 'Two',
                                                    value: 100 - parseInt(correctPercentage$.value)
                                                }
                                                ]}
                                                label={false}
                                                labelPosition={50}
                                                lengthAngle={360}
                                                lineWidth={15}
                                                onClick={undefined}
                                                onMouseOut={undefined}
                                                onMouseOver={undefined}
                                                paddingAngle={5}
                                                radius={50}
                                                rounded={false}
                                                startAngle={0}
                                                viewBoxSize={[
                                                100,
                                                100
                                                ]}
                                            />
                                        <span className="block__stats__mainbox--percentageBox--span"><p>{correctPercentage$.value+"%"}</p></span>
                                    </div>
                                    <h4>Correct Answer Percentage</h4>
                                </article>
                            </div>
                            
                                <div className="block__stats--button">
                                    <button aria-label="reset stats" onClick={clearStat}>Reset Stats</button>
                                </div>
                           
                        </section>
                        <Footer />
                    </main>
                    <FooterImg />
                </HelmetProvider>
           </>
}

export default Stats;