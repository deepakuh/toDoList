import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import Login from './pages/Login';

export default function App() {
  return (
    <div>
     
      <Routes>
        <Route index element= {<Login />}/>
        <Route path="/home" element= {<Home />}/>
        <Route path="/about" element= {<AboutPage />}/>
        <Route path="/contact" element= {<Contact />}/>
        <Route path="*" element= {<NoPage />}/>

      </Routes>
    </div>
  )
}
