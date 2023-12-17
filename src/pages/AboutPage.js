import React from 'react'
import Header from '../components/Header';
import '../App.css';

function AboutPage() {
  return (
    <div>
      <div>
      <Header />
      </div>
      <div className='aboutPage'>
     <p> 
      A to-do list is just a list of things you have to-do. 
      <p>
      That means basically anything and everything can be on your to-do list-but just because you've written your to-dos down doesn't mean your to-do list is actually useful. 
      </p>
      Effectively tracking when your work is due can help you prioritize and get great work done.
     </p>
     <p className='bottomCorner'>
     Created using react in vs-code
     </p>
     </div>
  
    
  
    </div>
    
  )
}

export default AboutPage;
