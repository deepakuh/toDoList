import React, { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import '../App.css';
import Header from '../components/Header';
import { getDocs, addDoc, collection, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../components/firebase';
import { toastSuccess, toastWarn } from '../util/Helper';


const Home = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const toDoCollectionRef = collection(db, 'toDoList');
  const getDoc = (id) => doc(db, 'toDoList', id);

  useEffect(() => {
    getToDoList()
  }, [])

  const getToDoList = async () => {
    const data = await getDocs(toDoCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTodos(filteredData);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (event.target.title.value.length > 0) {
      let toDo = {
        title: event.target.title.value,
        description: event.target.description.value,
        completed: false
      }
      addDoc(toDoCollectionRef, toDo)
        .then(() => {
          event.target.reset()
          toastSuccess('Added Successfully')
          getToDoList()
        })
    } else {
      toastWarn('Title cannot be empty')
    }
  }

  const setItemCompleted = (toDo) => {
    updateDoc(getDoc(toDo.id),
      {
        completed: true,
        completedOn: serverTimestamp()
      }).then(() => {
        toastSuccess('Task Completed')
        getToDoList()
      })

  }


  const handleDeleteTodoClicks = (index) => {
    Swal.fire({
      title: 'Delete',
      text: 'Do you want to delete?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(getDoc(index))
          .then(() => {
            getToDoList()
          })
      }
    })
  }

  const getDate = (date) => {
    let dateN = new Date(0)
    dateN.setUTCSeconds(date.seconds)
    return dateN.toDateString()
  }

  return (
    <div>
      <div >
        <Header />
      </div>
      <div className='todo-component'>
        <div className='todo-input'>
          <div className="btnArea">
            <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
              onClick={() => setIsCompleteScreen(false)}>
              TO-DO
            </button>
            <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
              onClick={() => setIsCompleteScreen(true)}>
              COMPLETED
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <div className='todo-input-item' >
              <label>Title</label>
              <input id="title" type="text" name="title" placeholder="New Task Title" />
            </div>
            <div className="todo-input-item">
              <label>Notes</label>
              <input id="notes" type="text" name="description" placeholder="Task Description" />
            </div>
            <div className="todo-input-item">
              <button type="submit" className='selectingBtn'>ADD</button>
            </div>
          </form>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false && allTodos.filter(todo => !todo.completed).map((item) => {
            return (
              <div className="todo-list-item" key={item.id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className="icon"
                    onClick={() => handleDeleteTodoClicks(item.id)}
                    title="Delete" />
                  <AiOutlineCheck className="check-icon"
                    onClick={() => setItemCompleted(item)}
                    title="Complete" />
                </div>
              </div>
            )
          })}
          {isCompleteScreen === true && allTodos.filter(todo => todo.completed).map((item) => {
            return (
              <div className="todo-list-item" key={item.id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on : {getDate(item.completedOn)}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className="icon" onClick={() => handleDeleteTodoClicks(item.id)} title="Delete" />
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

