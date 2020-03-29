import React from 'react';
import FocusTrap from 'focus-trap-react';
import { Link } from 'react-router-dom';
import './sidebar.css';

function Sidebar({ isOpen, onClickMask }) {

    let className = "Sidebar";
  
    if (!isOpen) {
      className += " Sidebar--closed";
    }

    return (
        <FocusTrap active={isOpen} paused={!isOpen}>
          <div>
            {isOpen && (
              <label onClick={onClickMask} className="Sidebar__mask">
                <button aria-label="Close menu" className="Sidebar__mask-button"></button>
              </label>
            )}
            <div className={className}>
              <ul className="Sidebar__menu">
                    <li className="Sidebar__menu-item">
                        <Link to="/" className="Sidebar__menu-link">Home
                            <i className="material-icons" style={{position:"absolute", top: "12px", marginLeft:"20px", marginRight: "20px" }}>
                                home
                            </i>
                        </Link>
                    </li>
                    <li className="Sidebar__menu-item">
                        <Link to="/about" className="Sidebar__menu-link">About Game
                            <i className="material-icons" style={{position:"absolute", top: "12px", marginLeft:"20px", marginRight: "20px" }}>
                                info
                            </i>
                        </Link>
                    </li>
                    <li className="Sidebar__menu-item">
                        <Link to="/stats" className="Sidebar__menu-link">Game Stats
                            <i className="material-icons" style={{position:"absolute", top: "12px", marginLeft:"20px", marginRight: "20px" }}>
                                pie_chart
                            </i>
                        </Link>
                    </li>
              </ul>
            </div>
          </div>
        </FocusTrap>
      );
 }

 export default Sidebar;