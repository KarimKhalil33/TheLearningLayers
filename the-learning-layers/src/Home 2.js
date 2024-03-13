import React from "react";
import logo from './images/1.png'
import { useNavigate } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <header className="App-header">


        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-intro">
          Unveil the layers of knowledge with a single click.
        </p>
        <button
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started
        </button>
      </header>
    </div>
  )
}

export default Home