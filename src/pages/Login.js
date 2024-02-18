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
        googleProvider.setCustomParameters({
          prompt: 'select_account',
        });
        const userName = user.displayName;
        const userID= user.uid;
        localStorage.setItem('userName', userName);
        localStorage.setItem('userID', userID);
              navigateToHome ();
       })
       
        }
        catch (err)
        {
            
            console.error(err);
        }
           }
    
    
  return (
    <div className='loginBg'>

        <div className='heading'>
           To-Do-List
        </div>
        <div className='signIn'>
            Sign in with your Google Account
        </div>
        <div className='input1' >
      
      <button className='input2' onClick={signInWithGoogle}><FcGoogle className='google' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Sign in with Google</button>
      </div>
    </div>
  )
}

export default Login