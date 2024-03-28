import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import CreateAccount from './createAccount';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Login from './login';
import Home from './Home 2';
import StudentPage from './studentPage';
import CreateCourse from './createCourse';
import TeacherPage from './teacherPage'
import AllCourses from './AllCourses';
import AdminPage from './AdminPage';
import ViewCourseTeacher from './viewCourseTeacher';
import TeacherAssignments from './teacherAssignments';
import PendingEnrollments from './pendingEnrollments';
import ViewCourseStudent from './viewCourseStudent';
import GradeAssignment from './gradeAssignment';
import ViewStudents from './viewStudents';
import Profile from './Profile';
import Grades from './Grades';

function setAuthenticationId(authenticationId) { //setauthenticationId which is username and store it in session, this keeps the user logged
  sessionStorage.setItem('authenticationId', JSON.stringify(authenticationId));
}
function setCollectionName(collectionName) {//get which collection in MongoDB it belongs to
  sessionStorage.setItem('collectionName', JSON.stringify(collectionName));
}

function PrivateRoute({ roles }) {//use a private route with roles to ensure protected routes
  //get the username and collection that was stored in the session
  const authId = JSON.parse(sessionStorage.getItem('authenticationId'));
  const collectName = JSON.parse(sessionStorage.getItem('collectionName'));
  const userStatus = authId && collectName; // Check if both items exist

  if (!userStatus) { //if the user statud doesn't exist, take the user back to login
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

function AnonymousRoute() {//for all user who are not logged, allow access to certain sites
  const authId = JSON.parse(sessionStorage.getItem('authenticationId'));
  const collectName = JSON.parse(sessionStorage.getItem('collectionName'));
  const userStatus = authId && collectName; // Check if both items exist
  return userStatus ? <Navigate to="/" replace /> : <Outlet />;
}

function App() {
  
  return (
    <Router>
      <Routes>
        {/* For when a teacher logs in, they should only be able to access certain pages */}
        <Route element={<PrivateRoute roles={['Teacher']} />}>
          <Route path="/teacherPage" element={<TeacherPage/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/viewCourseTeacher" element={<ViewCourseTeacher/>}/>
          <Route path="/teacherAssignment" element={<TeacherAssignments/>}/>
          <Route path="/gradeAssignment" element ={<GradeAssignment/>}/>
          <Route path="/viewStudents" element={<ViewStudents/>}/> 
        </Route>
        {/* For when a student logs in, they should only be able to access certain pages */}
        <Route element={<PrivateRoute roles={['User']} />}>
          <Route path="/studentPage" element={<StudentPage />} />
          <Route path="/AllCourses" element={<AllCourses />} />
          <Route path="/viewCourseStudent" element={<ViewCourseStudent/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Grades" element={<Grades/>}/>
        </Route>
        {/* For when an admin logs in, they should only be able to access certain pages */}
        <Route element={<PrivateRoute roles={['Admin']} />}>
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/CreateCourse" element={<CreateCourse />} />
          <Route path="/pendingEnrollments" element={<PendingEnrollments />} />

        </Route>

        {/* For people who are not logged in */}
        <Route element={<AnonymousRoute />}>
          <Route path="/CreateAccount" element={<CreateAccount />} />

        </Route>

        {/* Anyone can access these pages if they are logged in or not */}
        <Route path="/login" element={<Login setAuthenticationId={setAuthenticationId} setCollectionName={setCollectionName} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
