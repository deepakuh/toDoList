import {React, useState} from 'react';
import { IoMdLogIn } from "react-icons/io";
import './Header.css';
import { useNavigate } from 'react-router-dom';
import {auth,} from './firebase';
import { signOut } from 'firebase/auth';

function Header(){

    const navigate = useNavigate();
    const navigateToLogin = () =>{
      navigate ('/')
  }
    const navigateToHome = () =>{
        navigate ('/home')
    }
    const navigateToAbout = () =>{
        navigate ('/about')
    }
    const navigateToContact = () =>{
        navigate ('/contact')
    }

    const logOutScreen = () => {
      signOut(auth).then (()=> {
        navigateToLogin();
      })
    }

    const [open] = useState(false);
 const Menus = [ "Login" ];
 

return(
  <div className='app' action="" id='toDoList'>
    <div>
  <p className='greeting'>
          Welcome {localStorage.getItem('userName')}
        </p>
        </div>

      <div > 
        
      
      <h9>
         <div className="logout" onClick={logOutScreen}>Logout
         </div> 
          </h9>
      <h6>
         <div className="contact" onClick={navigateToContact}>Contact
         </div> 
          </h6>
        <h4>
         <div className="about" onClick={navigateToAbout}>About
         </div> 
          </h4>
        <h5>
         <div className="home" onClick ={navigateToHome}> Home </div> 
          </h5>

         <h1> 
        To do list 
        </h1>

        
        
     

      
{open && (

        <div className="dropDown">
<u1>
{
  Menus.map((menu)=>(
    <h2 className="dropDownItem"  key={menu}>
    
    <IoMdLogIn />&nbsp;
    {menu}
    
    </h2>
  ))}
</u1>
        </div>
 )}
  </div>  
  </div>

  )
  }
  export default Header;
