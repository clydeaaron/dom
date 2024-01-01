import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import routes from "./pages/pagename";
import { Home, Login } from './pages';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path={routes.login} element={<Login/>}/>
        <Route exact path={routes.home} element={<Home/>}/>
      </Routes>
    </Router>
  );
};


export default App;
