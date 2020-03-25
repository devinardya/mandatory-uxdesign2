import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Home from "./Home/Home";
import Quiz from "./QuizPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
       <Route path="/quiz" component={Quiz} /> 
      </Router>
    </div>
  );
}

export default App;
