import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import routes from "./pages/pagename";
import { Courses, Home, Login, Rooms, Subjects, Students, Users, Enroll, UpdateClassRoom, CreateCourse, GradeCreation, UpdateCourse, CreateClasses, UpdateProf, AdminChecklist, Checklist, ViewChecklist } from './pages';



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
        <Route path={routes.course_creation} element={<CreateCourse/>} />
        <Route path={routes.createGrade} element={<GradeCreation /> } />
        <Route path={routes.updateCourse} element={<UpdateCourse/>} />
        <Route path={routes.UpdateCheckList} element={<UpdateProf/>} />
        <Route path={routes.adminChecklist} element={<AdminChecklist />} />
        <Route path={routes.ChecklistGrade} element={<Checklist /> } />
        <Route path={routes.viewChecklist} element={<ViewChecklist/>} /> 
      </Routes>
    </Router>
  );
};


export default App;
