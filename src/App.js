import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Search from './Search';
import React from 'react';
import { useState } from "react";
import WordSearch from './WordSearch';
import Upload from './Upload';

function App() {
  const [changeScreen, setChangeScreen] = useState(false);

  function updateScreenState(){
    setChangeScreen(true)
  }

  function resetScreenState(){
    setChangeScreen(false)
  }

  return (
    <Router>
      <div className="App">
        <Navbar updateScreenState={updateScreenState} resetScreenState={resetScreenState}/>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home changeScreen={changeScreen} resetScreenState={resetScreenState}/>}></Route>
            <Route path="/search" element={<Search changeScreen={changeScreen}/>}></Route>
            <Route exact path="/upload" element={<Upload/>}></Route>
            <Route path="/search/:word" element={<WordSearch changeScreen={changeScreen} updateScreenState={updateScreenState} resetScreenState={resetScreenState}/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
