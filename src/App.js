import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Home from "./Home/Home";
import Quiz from "./QuizPage";
import About from './About';
import Stats from './Stats';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/quiz" component={Quiz} /> 
        <Route path="/about" component={About} />
        <Route path="/stats" component={Stats} />
      </Router>
    </div>
  );
}

export default App;
