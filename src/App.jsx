import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])  // this one is to store all todo as array
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if(todostring){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const savetoLS  = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  

  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    });
    setTodos(newTodos)
    savetoLS();
  }


  const handleDelete = (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id !== id
    });
    setTodos(newTodos)
    savetoLS();
  }


  const handleAdd = ()=>{
    setTodos([...todos, {id:uuidv4(), todo, isCompleted:  false}])
    setTodo("")
    savetoLS();
  }


  const handleChange = (e)=>{
    setTodo(e.target.value)
  }


  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetoLS();
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[40%]">
      <h1 className="font-bold text-center text-3xl">iTask - manage your tasks at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold ">Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" class="placeholder-gray-500 border" placeholder="Enter your task" className="w-full border-2 rounded-md px-3 py-1"/>
          <button onClick={handleAdd} disabled = {todo.length<=3} className="bg-violet-800 hover:bg-violet-950 disabled:bg-gray-300 p-2 text-sm font-bold py-1 text-white rounded-full mx-5 cursor-pointer">Add</button>
        </div>
        <input className="my-4" id="show" onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
        <label className="mx-2" htmlFor="show">Show Finished</label> 
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-3"></div>
        <h2 className="font-bold text-lg">Your Todo's</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          {todos.map(item=>{
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between ">
              <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1 cursor-pointer"><FaRegEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1 cursor-pointer"><MdDeleteOutline /></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
