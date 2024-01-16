import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import routes from "./pages/pagename";
import { Courses, Home, Login, Rooms, Subjects, Students, Users, Enroll, UpdateClassRoom } from './pages';
import CreateClasses from './pages/CreateClasses';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path={routes.login} element={<Login/>}/>
        <Route path={routes.home} element={<Home/>}/>
        <Route path={routes.subjects} element={<Subjects />} />
        <Route path={routes.student} element={<Students />} />
        <Route path={routes.room} element={<Rooms/> } /> 
        <Route path={routes.courses} element={<Courses />} />
        <Route path={routes.createclass} element={<CreateClasses/>} />
        <Route path={routes.user} element={<Users />} />
        <Route path={routes.enroll} element={<Enroll/>} />\
        <Route path={routes.EditClassroom} element={<UpdateClassRoom/>} />
      </Routes>
    </Router>
  );
};


export default App;
