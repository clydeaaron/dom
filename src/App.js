import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import routes from "./pages/pagename";
import Login from './pages/Login';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path={routes.login} element={<Login/>}/>
      </Routes>
    </Router>
  );
};

export default App;
