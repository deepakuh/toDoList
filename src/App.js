import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import AboutPage from './pages/AboutPage';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';


export default function App() {
  return (
    <div>
      <ToastContainer
              position="top-center"
              autoClose={800}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover={false}
              theme="dark"
            />
      <Routes>
        <Route index element= {<Login />}/>
        <Route className='homeBg' path="/home" element= {<Home />}/>
        <Route path="/about" element= {<AboutPage />}/>
        <Route path="/contact" element= {<Contact />}/>
        <Route path="*" element= {<NoPage />}/>
      </Routes>
    </div>
  )
}
