import { useState } from "react"
import Navbar from './components/Navbar'
import './components/Container.css'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todoStr = localStorage.getItem("todos")
    if (todoStr) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }

  }, [])


  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    savetoLS();
  }

  const handleEdit = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id === id;
    })

    settodo(newtodos[0].todo)

    newtodos = todos.filter(item => {
      return item.id !== id;
    })
    settodos(newtodos);
    savetoLS();

  }

  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id;
    })
    settodos(newtodos);
    savetoLS();
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheck = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newtodos = [...todos];
    newtodos[index].isCompleted = !(newtodos[index].isCompleted);
    settodos(newtodos);
    savetoLS();
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  }


  return (
    <>
      <Navbar />
      <div className="Container max-sm:w-full max-sm:m-0 max-sm:h-[90vh]">
        <div className="font-bold text-xl">Add a Todo</div>
        <div className="flex items-center justify-center h-9">
          <input className=" w-[calc(100%-60px)] p-2 rounded-3xl" type="text" name='todo' placeholder="write here...." onChange={handleChange} value={todo} />
          <button disabled={todo.length <= 3} onClick={handleAdd}><lord-icon
            src="https://cdn.lordicon.com/tsrgicte.json"
            colors="primary:#ffffff,secondary:#ffffff"
            trigger="hover"
            style={{ width: '25px', height: '25px' }}>
          </lord-icon></button>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" checked={showFinished} onChange={toggleFinished} />
          <div>Show finished</div>
        </div>
        <div className="h-[1px] w-[80%] bg-gray-300 mx-auto"></div>
        <div className="font-bold text-xl">Your Todos</div>
        <div>
          {todos.length == 0 && <div>no todos to display</div>}
          {
            todos.map((item) => {
              return (showFinished || !item.isCompleted) && < div key={item.id} className="YourT " >
                <div className="flex gap-2">
                  <span><input name={item.id} type="checkbox" checked={item.isCompleted} onChange={(e) => handleCheck(e, item.id)} /></span>
                  <span className={`${item.isCompleted ? "line-through" : ""} break-all`} >{item.todo}</span>
                </div>
                <div className="flex">

                  <button onClick={(e) => handleEdit(e, item.id)}>   <lord-icon className="h-3 w-3 button1"
                    src="https://cdn.lordicon.com/fikcyfpp.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{ width: '25px', height: '25px' }}>
                  </lord-icon></button>

                  <button onClick={(e) => handleDelete(e, item.id)}><lord-icon className="h-3 w-3 button1"
                    src="https://cdn.lordicon.com/skkahier.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{ width: '25px', height: '25px' }}>
                  </lord-icon></button>
                </div>
              </div>
            })
          }
        </div>
      </div >
    </>
  )
}

export default App
