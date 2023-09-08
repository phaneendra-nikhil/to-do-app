import React, { useEffect, useState } from 'react'
import {RiDeleteBin2Line} from 'react-icons/ri'
import {BsCheck2Circle} from 'react-icons/bs'

const DashBoard = () => {
  const[isCompleteScreen, setIsCompleteScreen] = useState(false);
  const[allTodos, setTodos] = useState([]);
  const[newTitle, setNewTitle] = useState("");
  const[newDescription, setNewDescription] = useState("");
  const[completedTodo, setCompletedTodo] = useState([]);
 
  const handleAddTodo = () => {
    let newTodoItem = {
          title:newTitle,
          description:newDescription,
    };

    let updatedTodoArr = [...allTodos]
    updatedTodoArr.push(newTodoItem)
    setTodos(updatedTodoArr)
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };

  const handleDeleteTodo = (index) =>{
    let reducedTodo = [...allTodos]
    reducedTodo.splice(index,1)
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  }

  const completeDeleteTodo = (index) =>{

    let reducedTodo = [...completedTodo]
    reducedTodo.splice(index,1)
    localStorage.setItem('completedTodo',JSON.stringify(reducedTodo));
    setCompletedTodo(reducedTodo)
  }
  
  useEffect(()=> {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let saveCompletedTodo = JSON.parse(localStorage.getItem('completedlist'))
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (saveCompletedTodo) {
      setCompletedTodo(saveCompletedTodo);
    }
  },[])

const handleComplete=(index)=>{
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth()+1;
  let yyyy = now.getFullYear();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let completedOn = dd+" - "+ mm + "-" + yyyy + " at  " + h+ " : " + m + " : " + s + " " ;
  let filteredItem = {
    ...allTodos[index],
    completedOn:completedOn
  }

  let updatedCompletedArr = [...completedTodo];
  updatedCompletedArr.push(filteredItem)
  setCompletedTodo(updatedCompletedArr)
  handleDeleteTodo(index)
  localStorage.setItem('completedlist',JSON.stringify(updatedCompletedArr));
}
  return (
    <div className='dashboard'>
       <h1>My Todo's</h1>

       <div className="todo-wrapper">
         <div className="todo-input">

          <div className="todo-input-item">
            <label>Title</label>
            <input type='text' value = {newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='what is your task title'></input>
          </div>
          <div className="todo-input-item">
          <label>Description</label>
            <input type='text' value = {newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='what is your task description'></input>
          </div>
          <div className="todo-input-item">
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
          <div className="btn-area">
          <button className={`secondarybtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>todo</button>
            <button className={`secondarybtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>completed</button>
          </div>


          <div className="todo-list">

           {isCompleteScreen===false && allTodos.map((item,index) => {
            return(
              <div className="todo-list-item" key={index}>
              <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              </div>
  
              <div>
              <RiDeleteBin2Line className='delete-icon' onClick={() =>handleDeleteTodo(index)} title='Delete?'/>
              <BsCheck2Circle className='check-icon' onClick={()=>handleComplete(index)} title='Complete?'/>
              </div>
              </div>
            )
           })} 

            {isCompleteScreen===true && completedTodo.map((item,index) => {
            return(
              <div className="todo-list-item" key={index}>
              <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Completed on: {item.completedOn}</small></p>
              </div>
  
              <div>
              <RiDeleteBin2Line className='delete-icon' onClick={() => completeDeleteTodo(index)} title='Delete?'/>
     
              </div>
              </div>
            )
           })} 
           
          </div>
        
       </div>
       
    </div>
  )
}

export default DashBoard