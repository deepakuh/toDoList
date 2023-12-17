import React from 'react';
import '../Login.css';
import { signInWithPopup } from 'firebase/auth';
import {auth, googleProvider} from '../components/firebase';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

function Login() {
    
    const navigate = useNavigate();
   const navigateToHome = () =>{
        navigate ('/home')
    }
    
   /* const user = useState(null);

   useEffect(()=>{
        auth.onAuthStateChanged(user => {
        navigateToHome ();


        })
    }, [])*/
    
    
    const signInWithGoogle = async () => {
       
    
        try {
       await signInWithPopup (auth,googleProvider)
       auth.onAuthStateChanged(user => {
        navigateToHome ();
       })
      
        }
        catch (err)
        {
            console.error(err);
        }
           }
    
    
  return (
    <div>

        <div className='heading'>
            Welcome to To-Do-List
        </div>
        <div className='signIn'>
            Sign in with your Google Account
        </div>
        <div >
      
      <button className='input1' onClick={signInWithGoogle}><FcGoogle className='google' />&nbsp;  Sign in with Google</button>
      </div>
    </div>
  )
}

export default Login