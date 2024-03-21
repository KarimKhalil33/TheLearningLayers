import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import CreateAccount from './createAccount';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Login from './login';
import Home from './Home 2';
import StudentPage from './studentPage';
import CreateAssignment from './createAssignment';
import CreateCourse from './createCourse';
import TeacherDash from './teacherPage'
import AllCourses from './AllCourses';
import AdminPage from './AdminPage';
import PendingEnrollments from './pendingEnrollments';
import { useState } from 'react';

function setAuthenticationId(authenticationId) {
  sessionStorage.setItem('authenticationId', JSON.stringify(authenticationId));
}
function setCollectionName(collectionName) {
  sessionStorage.setItem('collectionName', JSON.stringify(collectionName));
}



function PrivateRoute({ roles }) {
  const authId = JSON.parse(sessionStorage.getItem('authenticationId'));
  const collectName = JSON.parse(sessionStorage.getItem('collectionName'));
  const userStatus = authId && collectName; // Check if both items exist

  if (!userStatus) {
    return <Navigate to="/login" replace />;
  }

  // Check for role-based access
  const allowed = roles.includes(collectName);

  // If user's role is allowed, render the requested route, otherwise redirect to login
  if (allowed) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
  
}

function AnonymousRoute() {
  const authId = JSON.parse(sessionStorage.getItem('authenticationId'));
  const collectName = JSON.parse(sessionStorage.getItem('collectionName'));
  const userStatus = authId && collectName; // Check if both items exist
  return userStatus ? <Navigate to="/" replace /> : <Outlet />;
}

function App() {
  // const [authenticationId, setAuthenticationId] = useState(); //using a useState variable to preserve changes to userId


  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute roles={['Teacher']} />}>
          <Route path="/teacherDash" element={<TeacherDash />} />
          <Route path="/CreateAssignment" element={<CreateAssignment />} />
        </Route>

        <Route element={<PrivateRoute roles={['User']} />}>
          <Route path="/studentPage" element={<StudentPage />} />
        </Route>

        <Route element={<AnonymousRoute />}>
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/login" element={<Login setAuthenticationId={setAuthenticationId} setCollectionName={setCollectionName} />} />
          <Route path="/" element={<Home />} />
        </Route>
        {/* <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login setAuthenticationId={setAuthenticationId} setCollectionName={setCollectionName} />} />

        <Route path="/studentPage" element={<StudentPage />} />
        <Route path="/teacherDash" element={<TeacherDash />} />
        <Route path="/CreateAssignment" element={<CreateAssignment />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AllCourses" element={<AllCourses />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
        <Route path="/pendingEnrollments" element={<PendingEnrollments />} /> */}

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
