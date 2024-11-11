import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import Logout from './components/Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" component={< Login />} />
        <Route exact path="/upload" component={< FileUpload />} />
        <Route exact path="/dashboard" component={< FileList />} />
        <Route exact path="/logout" component={< Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
