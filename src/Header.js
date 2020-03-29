import React from "react";
import { Link } from 'react-router-dom';
import Logo from "./design/quiz-logo.svg";
import './header.css';

class Header extends React.PureComponent {

    render() {

        let renderHeader =  (
                            <>
                                <figure>
                                    <img 
                                        src={Logo} 
                                        alt="quiz master logo" 
                                        className="block__header__logo" 
                                    />
                                </figure>
                            </>
                             )

        let renderPage;
        if(this.props.page === "home") {
            renderPage = <header className = "block__header-home">
                            <figure>
                                <img 
                                    src={Logo} 
                                    alt="quiz master logo" 
                                    className="block__header__logo" 
                                />
                            </figure>
                            <button onClick={this.props.onClickMenuButton} aria-label="Open menu" className="block__header-home__Header__menu-button">
                                    <i className="Header__menu-icon material-icons">menu</i>
                            </button>
                        </header>
        } else if(this.props.page === "quiz") {
            renderPage = <header className = "block__header-other">
                            {renderHeader}
                            <nav className="block__header--nav">
                                <h4>QUIZ MASTER //</h4>
                                <Link to="/" className="block__header--nav">HOME</Link>
                                <button onClick={this.props.onClickMenuButton} aria-label="Open menu" className="Header__menu-button">
                                    <i className="Header__menu-icon material-icons">menu</i>
                                </button>
                            </nav>
                        </header>
        } else if(this.props.page === "stats") {
            renderPage = <header className = "block__header-other">
                            {renderHeader}
                            <nav className="block__header--nav">
                                <h4>GAME STATS //</h4>
                                <Link to="/" className="block__header--nav">HOME</Link>
                                <button onClick={this.props.onClickMenuButton} aria-label="Open menu" className="Header__menu-button">
                                    <i className="Header__menu-icon material-icons">menu</i>
                                 </button>
                            </nav>
                        </header>
        } else if(this.props.page === "about") {
            renderPage = <header className = "block__header-other">
                            {renderHeader}
                            <nav className="block__header--nav">
                                <h4>ABOUT QUIZ MASTER //</h4>
                                <Link to="/" className="block__header--nav">HOME</Link>
                                <button onClick={this.props.onClickMenuButton} aria-label="Open menu" className="Header__menu-button">
                                    <i className="Header__menu-icon material-icons">menu</i>
                                 </button>
                            </nav>
                        </header>
        }

  
        return  <>
                    {renderPage}
                </>
    }
}

export default Header;