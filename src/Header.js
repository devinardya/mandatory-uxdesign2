import React from "react";
import { Link } from 'react-router-dom'
import Logo from "./design/quiz-logo.svg";
import './header.css';

class Header extends React.PureComponent {

    constructor(props) {
        super(props)
    }

    render() {

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
                        </header>
        } else if(this.props.page === "quiz") {
            renderPage = <header className = "block__header-quiz">
                            <figure>
                                <img 
                                    src={Logo} 
                                    alt="quiz master logo" 
                                    className="block__header__logo" 
                                />
                            </figure>
                            <Link to="/" className="block__header" style={{textDecoration:"none", fontSize: "16px", color:"#737373"}}>HOME</Link>
                        </header>
        }
  
        return  <>
                    {renderPage}
                </>
    }
}

export default Header;