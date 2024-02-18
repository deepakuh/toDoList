import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import "./Home.css";
import {
  getDocs,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../components/firebase";
import { toastSuccess, toastWarn } from "../util/Helper";
import { Button, useToast } from "@chakra-ui/react";
import { Input, Space } from 'antd';




const { Search } = Input;


const Home = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const toDoCollectionRef = collection(db, "toDoList");
  const getDoc = (id) => doc(db, "toDoList", id);
  const usersCollectionRef = collection(db, "usersDetail");

  const onSearch = (value, _e, info) => {

  if (value === '')
   {
    getToDoList();
  }
else 
{
  const searchData = allTodos.filter((todo) => todo.title.toLowerCase() === value.toLowerCase())
  .map((item) => {
    return (item);
  });

  setTodos(searchData);
}
  } 

  
  

  const user = localStorage.getItem("userID");
  let users = {
    userID: user,
  };

  useEffect(() => {
    getToDoList();
  }, []);

  const getToDoList = async () => {
    const user = localStorage.getItem("userID");
    const userName = localStorage.getItem("userName");
    let users = {
      userID: user,
      userName: userName,
    };

    const userData = await getDocs(usersCollectionRef);

    const userFlag = userData.docs
      .filter((doc2) => doc2.data().userID === user)
      .map((doc) => ({
        ...doc.data(),
      }));

    if (userFlag[0] == null) {
      addDoc(usersCollectionRef, users);
    }

    const data = await getDocs(toDoCollectionRef);
    const filteredData = data.docs
      .filter((doc1) => doc1.data().userId === user)
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

    setTodos(filteredData);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const user = localStorage.getItem("userID");

    if (event.target.title.value.length > 0) {
      let toDo = {
        title: event.target.title.value,
        description: event.target.description.value,
        completed: false,
        userId: user,
      };
      addDoc(toDoCollectionRef, toDo).then(() => {
        event.target.reset();
        toastSuccess("Added Successfully");
        getToDoList();
      });
    } else {
      toastWarn("Title cannot be empty");
    }
  };

  const setItemCompleted = (toDo) => {
    updateDoc(getDoc(toDo.id), {
      completed: true,
      completedOn: serverTimestamp(),
    }).then(() => {
      toastSuccess("Task Completed");
      getToDoList();
    });
  };
  const toast = useToast();
  const statuses = ["info"];


  const handleDeleteTodoClicks = (index) => {
    Swal.fire({
      title: "Delete",
      text: "Do you want to delete?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(getDoc(index)).then(() => {
          getToDoList();
        });
        toast({
          title: ` Task deleted `,
          status: statuses,
          isClosable: true,
          position: "bottom-left",
        });
      }
    });
  };

  const getDate = (date) => {
    let dateN = new Date(0);
    dateN.setUTCSeconds(date.seconds);
    return dateN.toDateString();
  };

  return (
    <div className="homeBg">
      <div>
      </div>
      <div className="todo-component">
      <div className="btnArea">
            <button
              className={`secondaryBtn ${isCompleteScreen === false && "active"
                }`}
              onClick={() => setIsCompleteScreen(false)}
            >
              TO-DO
            </button>
            <button
              className={`secondaryBtn ${isCompleteScreen === true && "active"
                }`}
              onClick={() => setIsCompleteScreen(true)}
            >
              COMPLETED
            </button>
          </div>
        <div className="todo-input">
          
          <form onSubmit={onSubmit}>
            <div className="todo-input-item">
              <label>Title</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Try typing 'Utilities bill'"
              />
            </div>
            <div className="todo-input-item">
              <label>Notes</label>
              <input
                id="notes"
                type="text"
                name="description"
                placeholder="Try typing 'Pay bill by Friday 6pm'"
              />
            </div>
            <div>
              <Button colorScheme="blue" type="submit" className="selectingBtn">
                ADD
              </Button>
            </div>
          </form>
        </div>
        <Search
          className="searchBar"
          placeholder="Type to search"
          allowClear
          onSearch={onSearch}
          size="medium"
          style={{
            width: 200,
          }}
          enterButton />

        <div className="todo-list">
          <div >


          </div>
          {isCompleteScreen === false &&
            allTodos
              .filter((todo) => !todo.completed)
              .map((item) => {
                return (
                  <div className="todo-list-item" key={item.id}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodoClicks(item.id)}
                        title="Delete"
                      />
                      <AiOutlineCheck
                        className="check-icon"
                        onClick={() => setItemCompleted(item)}
                        title="Complete"
                      />
                    </div>
                  </div>
                );
              })}
          {isCompleteScreen === true &&
            allTodos
              .filter((todo) => todo.completed)
              .map((item) => {
                return (
                  <div className="todo-list-item" key={item.id}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>
                        <small>
                          Completed on : {getDate(item.completedOn)}
                        </small>
                      </p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodoClicks(item.id)}
                        title="Delete"
                      />
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Home;
