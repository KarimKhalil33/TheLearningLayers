import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Home/>
      </header>
    </div>
  );
}

export default App;