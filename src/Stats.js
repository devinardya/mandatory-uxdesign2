import React from 'react';
import './stats.css';
import { Helmet } from 'react-helmet';
import FooterImg from './FooterImg';
import { playedGames$, updatePlayedGames, correctPercentage$, correctAnswers$, incorrectAnswers$, updateCorrectAnswersStat, updateIncorrectAnswersStat, updateCorrectPercentage  } from './store';
import FocusTrap from 'focus-trap-react';
import Header from "./Header";
import Footer from "./Footer";


const Stats = () => {

    const clearStat = () => {
        updatePlayedGames(0);
        updateCorrectAnswersStat(0);
        updateIncorrectAnswersStat(0);
        updateCorrectPercentage(0);
        window.location.reload();
    }

    return <>   
                <Helmet>
                    <title>Quiz Master - Stats</title>
                </Helmet>
                <main className="block">
                    <Header page="quiz"/>
                    <section className="block__stats">
                        <h2>Game Stats</h2>
                        <article>
                            <h4>Game Played</h4>
                            <p>{playedGames$.value < 10 || playedGames$.value === 0 ? "0" + playedGames$.value : playedGames$.value}</p>
                            <h4>Correct Answers</h4>
                            <p>{correctAnswers$.value < 10 || correctAnswers$.value === 0 ? "0" + correctAnswers$.value : correctAnswers$.value}</p>
                            <h4>Incorrect Answers</h4>
                            <p>{incorrectAnswers$.value < 10 || incorrectAnswers$.value === 0 ? "0" + incorrectAnswers$.value : incorrectAnswers$.value}</p>
                            <h4>Correct Percentage</h4>
                            <p>{correctPercentage$.value === 0 ? "00 %" : correctPercentage$.value + "%"}</p>
                        </article>
                        <div className="block__stats--button">
                            <button onClick={clearStat}>Clear Stats</button>
                        </div>
                    </section>
                    <Footer />
                </main>
                <FooterImg />
           </>
}

export default Stats;