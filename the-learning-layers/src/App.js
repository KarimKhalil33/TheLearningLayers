import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from './createAccount';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Login from './login';
import Home from './Home 2';
import StudentPage from './studentPage';
import CreateAssignment from './createAssignment';
import CreateCourse from './createCourse';
import TeacherDash from './teacherPage'


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/CreateAccount" element={<CreateAccount />} />
      <Route path="/login" element={<Login/>}/>

      <Route path="/studentPage" element={<StudentPage />} />
      <Route path="/teacherDash" element={<TeacherDash/>}/>
      <Route path = "/CreateAssignment" element={<CreateAssignment/>}/>
      <Route path = "/createCourse" element={<CreateCourse/>}/>
      <Route path="/" element={<Home/>}/>

      </Routes>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
