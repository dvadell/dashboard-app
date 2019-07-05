import React from 'react';
import {Redirect} from 'react-router-dom'
import MainPage from './components/MainPage/MainPage'
import './App.css';

function App() {
  return (      
      <Redirect to="/iw/" />
    // <div className="App">
    //   <Redirect to="/iw/" />
    //     <MainPage/>
    // </div> 
  );
}

export default App;
