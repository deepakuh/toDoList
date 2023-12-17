import React, { useEffect, useState } from 'react';
import {  AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';
import { getAuth } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import '../App.css';
import Header from '../components/Header';
import {getDocs, addDoc, collection, deleteDoc, doc} from 'firebase/firestore';
import { db } from '../components/firebase';



function Home() {

  
  
  
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle, setNewTitle,] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState([]); 
  const toDoCollectionRef =  collection(db, 'toDoList');
  const completedToDoCollectionRef =  collection(db, 'completedToDoList');
     
 
  const onInput1= (e) => setNewTitle(e.target.value);
  const onInput2= (e) => setNewDescription(e.target.value);
  /*const rootElement = document.getElementById("root");
  const root = createRoot(rootElement)*/

  const notify2 = (index, title, description) => {
    handleComplete(index, title, description);
    toast.success('Task Completed', {
      position: "top-center",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      })
}


  const handleAddTodo = async ()=>{
    
    let newTodoItem ={
      title:newTitle,
      description:newDescription
    };
    if (newTodoItem.title==0) {
      toast.warn('Title cannot be empty', {
        position: "top-right",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        })
        setNewDescription("");
      }
    else { /*let updatedTodoArr = [...allTodos];*/
      setNewTitle("");
      setNewDescription("");

   /* updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
   localStorage.setItem('todo-list',JSON.stringify(updatedTodoArr))
   */
    
   await addDoc (toDoCollectionRef, 
    {
      TitleText:newTitle,
      DescriptionText: newDescription
    }
    )

    toast.success('Added Successfully', {
      position: "top-center",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    })
  /*  setTimeout(() =>{
      window.location.reload(true);
    },1000);
    */
    
  }};


  const handleClick1 = (index) => {
      Swal.fire({
      title: 'Delete',
      text: 'Do you want to delete?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
}).then((result) => {
  if (result.isConfirmed) {
    handleDeleteTodo(index);
  } else if (result.isDenied) {
  }
    })
  }

  const handleClick2 = (index) => {
    Swal.fire({
    title: 'Delete',
    text: 'Do you want to delete?',
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
}).then((result) => {
if (result.isConfirmed) {
  handleDeleteCompletedTodo(index);
} else if (result.isDenied) {
}
  })
}

  const handleDeleteTodo = async(index) =>{

    const toDoDoc = doc(db, 'toDoList', index);
    await deleteDoc(toDoDoc);
   /* let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('todo-list', JSON.stringify(reducedTodo));
    setTodos(reducedTodo)*/
  /*  window.location.reload(true);*/
  }

  const handleDeleteTodoClicks = handleClick1;
  const handleDeleteCompletedClicks = handleClick2;
  const completedNotify = notify2;
  

  const handleComplete = async (index, title, description) =>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let completedOn = dd + '-' + mm + '-' + yyyy ;
     
   /* let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn,
    };*/

     await addDoc (completedToDoCollectionRef,
    {
      TitleText:title,
      DescriptionText: description,
      CompletedOn:  completedOn
    }
    
    )
  /*  window.location.reload(true);*/
    ;


     /*let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);*/
    handleDeleteTodo(index);
    /* localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));*/
    
  };

  const handleDeleteCompletedTodo = async(index) =>{
   /* let reducedTodo = [...completedTodos]; 
    reducedTodo.splice(index,1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo)*/
    const CompletedToDoDoc = doc(db, 'completedToDoList', index);
    await deleteDoc(CompletedToDoDoc);
    /*window.location.reload(true);*/
  }
  
 useEffect(()=>{
  /*  let savedTodo = JSON.parse(localStorage.getItem('todo-list'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    */
    
    const savedTodo = async()=>{
      try {
        const data = await getDocs (toDoCollectionRef);
        const filteredData = data.docs.map ((doc)=> ({
          ...doc.data(),
          id: doc.id,
        })); 
        setTodos(filteredData);
      }
      catch (err)
      {
        console.error(err);
      }
           
    };

    savedTodo();

    const savedCompletedTodo = async()=>{
      try {
        const data = await getDocs (completedToDoCollectionRef);
        const filteredData = data.docs.map ((doc)=> ({
          ...doc.data(),
          id: doc.id,
        })); 
        setCompletedTodos(filteredData);
      }
      catch (err)
      {
        console.error(err);
      }
           
    };

    savedCompletedTodo();     
   
},)

  
 return (                    
<div>   
    <div >
    <Header />  
    </div>
    
                                    
      
      <div className='todo-component'>    
      <div className='todo-input'>

      <div className="btnArea"> 
      <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} 
      onClick={()=>setIsCompleteScreen(false)}>
      TO-DO
      </button>
      <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} 
      onClick={()=>setIsCompleteScreen(true)}>
      COMPLETED
      </button>
    </div>

      <div className='todo-input-item' >
      <label>Title</label>
      
      <input id="title" type="text" value={newTitle} onInput1={onInput1} onChange={(e)=>setNewTitle(e.target.value)}  placeholder="New Task Title" />
      </div>

      <div className="todo-input-item">
      <label>Notes</label>
      <input id="notes" type="text" value={newDescription} onInput2={onInput2} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Task Description" />
      </div>

      <div className="todo-input-item">
     <button type="button" onClick={handleAddTodo} className='selectingBtn'>ADD</button> 
     
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
      </div> 
      </div>

      


      <div className="todo-list">
      
{isCompleteScreen===false && allTodos.map ((item)=>{
  return(
    
    <div className= "todo-list-item" key={item.id}> 

    <div>
    <h3>{item.TitleText}</h3>
    <p>{item.DescriptionText}</p>
    </div>

    <div>
      <AiOutlineDelete className= "icon" 
      onClick={()=>handleDeleteTodoClicks(item.id)} 
      title="Delete"/>
      <AiOutlineCheck className= "check-icon" 
      onClick={()=>completedNotify(item.id, item.TitleText, item.DescriptionText)} 
       title="Complete"/>
     </div>

 
    </div>  
  )
  })}

{isCompleteScreen===true && completedTodos.map ((item)=>{
  return(
    
    <div className= "todo-list-item" key={item.id}> 

    <div>
    <h3>{item.TitleText}</h3>
    <p>{item.DescriptionText}</p>
    <p><small>Completed on : {item.CompletedOn}</small></p>
    </div>
    

    <div>
      <AiOutlineDelete className= "icon" onClick={()=>handleDeleteCompletedClicks(item.id)} title="Delete"/>
      
     </div>

 
  
  </div>  
  )
  })}
              </div> 
            </div>
            </div>
   
 );
}

export default Home;

