import { useState } from 'react'
import './App.css'



function App() {
  const [todoNew, setTodoNew] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("all")
  const [todo, setTodo] = useState([{
    id: Date.now(),
  }])

  function addTodo() {
    const newTodoItem = {
      id: Date.now(),
      title: todoNew, 
      status: "active"
    }

    setTodo([...todo, newTodoItem]);
    setTodoNew("")
  }

  function removeTodo(idx) {
    const newTodos = todo.map((todo_item) => todo_item.id === idx ? {...todo_item, status: "moved to trash"} : todo_item)
    setTodo(newTodos)
  }

  function makeTodoDone(idx) {
    const newTodos = todo.map((todo_item) => todo_item.id === idx ? {...todo_item, status: "done"} : todo_item)
    setTodo(newTodos)
  }

  function moveTotrash(idx) {
    const newTodos = todo.map((todo_item) => todo_item.id === idx ? {...todo_item, status: "moved to trash"} : todo_item)
    setTodo(newTodos)
  }

  function changeStatus(newStatus) {
    setFilteredStatus(newStatus)
  }

  function makePlusOpen(idx) {
    const InputWindow = ({ isOpen, onClose, onSave }) => {
      const [inputText, setInputText] = useState('');
      const handleInputChange = (e) => {
        setInputText(e.target.value);
      };
      const handleSaveClick = () => {
        onSave(inputText);
        setInputText('');
        onClose();
      };
      return (
        <div style={{ display: isOpen ? 'block' : 'none', border: '1px solid black', padding: '10px' }}>
          <input type="text" value={inputText} onChange={handleInputChange} />
          <button onClick={handleSaveClick}>Add</button>
        </div>
      );
    };
    const App = () => {
      const [isInputOpen, setIsInputOpen] = useState(false);
    
      const handlePlusClick = () => {
        setIsInputOpen(!isInputOpen);
      };
      const handleSave = (text) => {
        console.log(`Saving text: ${text}`);
      };
      return (
        <div>
          <button onClick={handlePlusClick}>+</button>
          <InputWindow isOpen={isInputOpen} onClose={() => setIsInputOpen(false)} onSave={handleSave} />
        </div>
      );
    };
    
  }

  const filteredTodos = todo.filter((task) => {
    if (filteredStatus == "To do") return task;
    if (filteredStatus == "done" && task.status == "done") return task;
    if (filteredStatus == "trash" && task.status == "moved to trash") return task;
  })

  return (
    <div className='container'>
      <header>
        <p className='todo_welcome'>Simple To Do List</p>
        <div className='welcome_sentence'> Today is awesome day. The weather is awesome, you are awesome too! </div>
      </header>
      <main>
        <div className='plus_sign'>
        <button onClick={() => makePlusOpen(todo_item.id)}><div className='actions_container'>
          <input value={todoNew} onChange={(event) => {setTodoNew(event.target.value)}} className='todo_input' placeholder='Your text' />
          <button onClick={addTodo}>Add</button>
        </div></button>
        </div>
        <div className='filter_buttons'>
          <button onClick={() => changeStatus("done")}>Done</button>
          <button onClick={() => changeStatus("To do")}>To do</button>
          <button onClick={() => changeStatus("trash")}>Trash</button>
        </div>
        <div className='todo_container'>
          {filteredTodos.map((todo_item, idx) => (
            <div className='todo_item_container'>
              <p className='todo_item'>{todo_item.title + " - " + todo_item.status}</p>
              <button onClick={() => removeTodo(todo_item.id)}>Remove</button>
              <button onClick={() => makeTodoDone(todo_item.id)}>Done</button>
            </div>
          ))}
        </div>
        <div className='trash_container'>
        <button onClick={() => moveTotrash(todo_item.id)}> <img src='./trash icon.png'></img> Move to Trash</button>
        </div>
      </main>
      <footer>
        <p className='footer_title'>Made with ❤️ at nFactorial in 2022.</p>
      </footer>
    </div>
  )
}

export default App
