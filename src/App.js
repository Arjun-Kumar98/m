
import React from 'react';
import LoginPage from './LoginPage';
import  AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import SignUpPage from './SignUpPage';
import MovieList from './MovieList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} /> {/* Default Route */}
      <Route path="/newMovie" element={<AddMovie />} /> {/* Another Page */}
      <Route path="/editMovie/:movieId" element={<EditMovie />}/>
      <Route path="/signUp" element={<SignUpPage />}/>
      <Route path="/movieList" element={<MovieList />}/>
      
    
    </Routes>
  </Router>
  );
}

export default App;
