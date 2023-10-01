import { toast } from 'sonner'
import Todo from '../components/models/Todo'
import AddTodo from '../components/todos/AddTodo'
import TodoItem from '../components/todos/TodoItem'
import { useEffect, useState } from 'react'
import { filterTypes } from '../components/enums/filterTypes'

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]) // Initialize state
  const [filter, setFilter] = useState<filterTypes>(filterTypes.undone)

  const addTodo = (newTodo: Todo): void => {
    const currentTodos = JSON.parse(localStorage.getItem('TODOS') || '[]')
    const updatedTodos = [...currentTodos, newTodo]
    // Assuming `todos` is an array
    localStorage.setItem('TODOS', JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
    toast.success(`${newTodo.title} added successfully!`)
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('TODOS') || '[]')
    setTodos(storedTodos)
  }, [])

  const deleteTodo = (id: string): void => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    localStorage.setItem('TODOS', JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
  }

  const editTodo = (id: string, updatedTitle: string): void => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title: updatedTitle } : todo,
    )
    localStorage.setItem('TODOS', JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
    toast.success(`${updatedTitle} added Updated.`)
  }

  const toggleTodoStatus = (id: string): void => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, is_done: !todo.is_done } : todo,
    )
    const updatedTodo = updatedTodos.find(t => t.id === id)
    localStorage.setItem('TODOS', JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
    toast.success(
      `${updatedTodo?.title} Status ${
        updatedTodo?.is_done ? 'marked done.' : 'marked undone.'
      }`,
    )
  }

  const filteredTodos = todos.filter(todo =>
    filter === filterTypes.done ? todo.is_done : !todo.is_done,
  )

  return (
    <main>
      <section className='jumbotron'>
        <div className='container d-flex flex-column align-items-center'>
          <h1 className='jumbotron-heading mt-4'>Never forget!</h1>
          <p className='lead text-muted'>Your to-do list is your mental net</p>
          <AddTodo addTodo={addTodo} />
        </div>
      </section>
      <div className='todosList mt-4'>
        <div className='container'>
          <div className='d-flex flex-column align-items-center '>
            <nav className='col-6 mb-3'>
              <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                <a
                  onClick={() => setFilter(filterTypes.undone)}
                  className={`'nav-item nav-link font-weight-bold' ${
                    filter === filterTypes.undone ? 'active' : ''
                  }`}
                  id='nav-home-tab'
                  role='button'
                >
                  💬 Undone&nbsp;
                  <span className=' badge-secondary'>
                    {todos.filter(item => item.is_done === false).length}
                  </span>
                </a>
                <a
                  onClick={() => setFilter(filterTypes.done)}
                  className={`'nav-item nav-link font-weight-bold' ${
                    filter === filterTypes.done ? 'active' : ''
                  }`}
                  id='nav-profile-tab'
                  role='button'
                >
                  ✅ Done&nbsp;
                  <span className=' badge-success'>
                    {todos.filter(item => item.is_done === true).length}
                  </span>
                </a>
              </div>
            </nav>
            {filteredTodos.map((todo: Todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleTodoStatus={toggleTodoStatus}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
