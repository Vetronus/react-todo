import React, {useState, useEffect} from 'react'

function TodoCard({todo, removeFromList, markDone}) {

	return (
		<div className="p-3 border-solid border-2 border-gray-700 ">
			<p className={"mb-3 " + (todo.done && "line-through ")}>{todo.name}</p>
			{ !todo.done && <button className="px-2 py-1 mr-2 bg-gray-700 text-white" onClick={() => markDone(todo)}>Done</button> }
			<button className="px-2 py-1 bg-rose-500 text-white" onClick={() => removeFromList(todo)}>Delete</button>
		</div>
	)
}

function TodoInput({addToList}) {
	const [todo, setTodo] = useState({name: "", done: false, id: Date.now()});

	function addToDo(e){
		// add todo to the todoList
		addToList(todo);
		// reset the todo input
		setTodo({ name: "", done: false, id: Date.now() });
	}

	return (
		<div className="font-medium text-base text-white border-solid border-2 border-gray-700 flex flex-row">
			<input className="p-2 w-full outline-none text-black" type="text" placeholder="Add new todo" value={todo.name}  onChange={(e) => setTodo({name: e.target.value, done: false, id: Date.now()})}/>
			<button className="px-4 py-1 bg-gray-700 text-white" onClick={addToDo}>Add</button>
		</div>
	)
}

export default function App() {
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem("todoList"));
		if(todos) {
			setTodoList(todos);
		}
	}, []);

	function addToList(todo) {
		setTodoList([todo, ...todoList]);
		localStorage.setItem("todoList", JSON.stringify([todo, ...todoList]));
	}

	function removeFromList(todo) {
		const newTodoList = todoList.filter((t) => t.id !== todo.id);
		setTodoList(newTodoList);
		localStorage.setItem("todoList", JSON.stringify(newTodoList));
	}

	function markDone(todo) {
		const newTodoList = todoList.map((t) => {
			if(t.id === todo.id) {
				t.done = true;
			}
			return t;
		});
		setTodoList(newTodoList);
		localStorage.setItem("todoList", JSON.stringify(newTodoList));
	}

  return (
    <div className="flex items-center h-screen flex-col p-10 gap-10">
      <h1 className="text-center font-bold text-4xl text-gray-700">My Todo List</h1>
      <div className=" w-full sm:w-1/2 max-w-xl flex flex-col items-stretch gap-4 pb-10">
				<TodoInput addToList = {addToList} />
				{todoList.map((todo, index) => <TodoCard key={todo.id} todo={todo} removeFromList = {removeFromList} markDone = {markDone} />)}
				{todoList.length===0 && <div className='text-center'> Create new todos to see them here.</div>}
      </div>
    </div>
  )
}