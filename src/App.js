import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import routes from "./pages/pagename";
import { Admin, Courses, Home, Login, Rooms, Subjects } from './pages';
import CreateClasses from './pages/CreateClasses';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path={routes.login} element={<Login/>}/>
        <Route path={routes.home} element={<Home/>}/>
        <Route path={routes.subjects} element={<Subjects />} />
        <Route path={routes.student} element={<Admin />} />
        <Route path={routes.room} element={<Rooms/> } /> 
        <Route path={routes.courses} element={<Courses />} />
        <Route path={routes.createclass} element={<CreateClasses/>} />
      </Routes>
    </Router>
  );
};


export default App;
