import React, { useState, useRef, useEffect } from 'react';
import movieIcon from './design/movie-icon.svg';
import musicIcon from './design/music-icon.svg';
import booksIcon from './design/books-icon.svg';
import { Redirect } from 'react-router-dom';

const HomeSection = () => {

    const [selected, updateSelected] = useState("");
    const [startGame, updateStartGame] = useState(false);
    const homeRef = useRef(null);

    const onChange = (e) => {
        //console.log(e.target.value)
        updateSelected(e.target.value)
        
    }

    useEffect( () => {
        homeRef.current.focus();
    },[homeRef])

  

    const start = () => {
        if(selected !== "") {
            updateStartGame(true)
        }
    }

    if(startGame) {
        return <Redirect to={{
                pathname: '/quiz',
                state: { category: selected }
            }}
        />
    } 


    return <section className = "block__home__section">
                <h3 ref={homeRef} tabIndex="0">Choose one from the categories below and see how many questions you can answer correctly out of 10 questions!</h3>
                <div className="block__home__section__figures">
                    <label className="block__home__section__figures-input"  >
                        <input type="radio" 
                               name="category" 
                               checked={selected === "movie"} 
                               value={"movie"} 
                               aria-label="category movie"
                               onChange={onChange}
                               />
                        <figure className="block__home__section__figures-input-fake">
                            <img src={movieIcon} alt="movie category" />
                        </figure>
                        <figcaption>MOVIE</figcaption>
                    </label>
                    <label className="block__home__section__figures-input" >
                        <input type="radio" 
                               name="category" 
                               checked={selected === "music"} 
                               value={"music"}  
                               aria-label="category music"
                               onChange={onChange} 
                               />
                        <figure className="block__home__section__figures-input-fake">
                          <img src={musicIcon} alt="music category" />
                        </figure>
                        <figcaption>MUSIC</figcaption>
                    </label>
                    <label className="block__home__section__figures-input" >
                        <input type="radio" 
                               name="category" 
                               checked={selected === "books"} 
                               value={"books"}  
                               aria-label="category books"
                               onChange={onChange}
                               />
                        <figure className="block__home__section__figures-input-fake">
                          <img src={booksIcon} alt="books category" />
                        </figure>
                        <figcaption>BOOKS</figcaption>
                    </label>
                </div>
                <button className="block__home__section__submit" aria-label="Start Quiz" onClick={start}>
                    Start Quiz!
                </button>
            </section>
}

export default HomeSection;