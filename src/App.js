import React, { useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import { AiOutlineBars, AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';
import { IoMdLogIn } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle, setNewTitle,] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState([]); 
 
  const onInput1= (e) => setNewTitle(e.target.value);
  const onInput2= (e) => setNewDescription(e.target.value);
  const rootElement = document.getElementById("root");
  const root = createRoot(rootElement)

  const notify2 = (index) => {
    handleComplete(index);
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


  const handleAddTodo = ()=>{
    
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
        })}
    else { let updatedTodoArr = [...allTodos];
      setNewTitle("");
      setNewDescription("");
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
   localStorage.setItem('todo-list',JSON.stringify(updatedTodoArr))
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

  const handleDeleteTodo = index =>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('todo-list', JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  }

  const handleDeleteTodoClicks = handleClick1;
  const handleDeleteCompletedClicks = handleClick2;
  const completedNotify = notify2;
  

  const handleComplete = index=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let completedOn = dd + '-' + mm + '-' + yyyy 
     
    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index)
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) =>{
    let reducedTodo = [...completedTodos]; 
    reducedTodo.splice(index,1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo)
  }
  
 useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todo-list'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
    setTodos(savedTodo);

    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  }
},[])
 const [open, setOpen] = useState(false);
 const Menus = [ "Login" ];
 

const homeTab = () => {
  window.location.reload();
};

const aboutNotes =() => {
  //Swal.fire("A to-do list is just a list of things you have to-do. That means basically anything and everything can be on your to-do list—but just because you've written your to-dos down doesn't mean your to-do list is actually useful. Effectively tracking when your work is due can help you prioritize and get great work done.");
  Swal.fire({
    title: "About",
    text: "A to-do list is just a list of things you have to-do. That means basically anything and everything can be on your to-do list—but just because you've written your to-dos down doesn't mean your to-do list is actually useful. Effectively tracking when your work is due can help you prioritize and get great work done.",
    icon: "question"
  });
}
  

 return (
   
   <div className="App"  action="" id="toDoList">
      <div>
      
        <h4>
         <div className="about" onClick={aboutNotes}>About</div> 
          </h4>
        <h5>
         <div className="home" onClick ={homeTab}> Home </div> 
          </h5>

          <h1> 
        <AiOutlineBars className="toggleIcon" onClick={() => setOpen(!open)}></AiOutlineBars>
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
      
{isCompleteScreen===false && allTodos.map ((item,index)=>{
  return(
    
    <div className= "todo-list-item" key={index}> 

    <div>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    </div>

    <div>
      <AiOutlineDelete className= "icon" 
      onClick={()=>handleDeleteTodoClicks(index)} 
      title="Delete"/>
      <AiOutlineCheck className= "check-icon" 
      onClick={()=>completedNotify(index)} 
       title="Complete"/>
     </div>

 
  
  </div>  
  )
  })}

{isCompleteScreen===true && completedTodos.map ((item,index)=>{
  return(
    
    <div className= "todo-list-item" key={index}> 

    <div>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <p><small>Completed on : {item.completedOn}</small></p>
    </div>
    

    <div>
      <AiOutlineDelete className= "icon" onClick={()=>handleDeleteCompletedClicks(index)} title="Delete"/>
      
     </div>

 
  
  </div>  
  )
  })}
              </div> 
            </div>
         </div>
   
 );
}
export default App;
