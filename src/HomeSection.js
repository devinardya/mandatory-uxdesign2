import React, { useState } from 'react';
import movieIcon from './design/movie-icon.svg';
import musicIcon from './design/music-icon.svg';
import booksIcon from './design/books-icon.svg';

const HomeSection = () => {

    const [selected, updateSelected] = useState("");

    const onChange = (e) => {
        console.log(e.target.value)
        updateSelected(e.target.value)
        
    }


    return <section className = "block__section">
                <h3>Choose one from three categories below and see how many correct answers you can get out of 10 questions!</h3>
                <div className="block__section__figures">
                    <label className="block__section__figures-input">
                        <input type="radio" name="category" checked={selected === "movie"} value={"movie"} onChange={onChange}/>
                        <figure className="block__section__figures-input-fake">
                            <img src={movieIcon} alt="movie category" />
                        </figure>
                        <figcaption>MOVIE</figcaption>
                    </label>
                    <label className="block__section__figures-input">
                        <input type="radio" name="category" checked={selected === "music"} value={"music"}  onChange={onChange} />
                        <figure className="block__section__figures-input-fake">
                          <img src={musicIcon} alt="music category" />
                        </figure>
                        <figcaption>MUSIC</figcaption>
                    </label>
                    <label className="block__section__figures-input">
                        <input type="radio" name="category" checked={selected === "books"} value={"books"}  onChange={onChange} />
                        <figure className="block__section__figures-input-fake">
                          <img src={booksIcon} alt="books category" />
                        </figure>
                        <figcaption>BOOKS</figcaption>
                    </label>
                </div>
                <button className="block__section__submit">
                    Start Quiz!
                </button>
            </section>
}

export default HomeSection;