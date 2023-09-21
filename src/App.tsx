import 'bootstrap/dist/css/bootstrap.css'
import { filterTypes } from './components/enums/filterTypes'
import { useEffect, useState } from 'react'
import AddTodo from './components/todos/AddTodo'
import Header from './components/layouts/Header'
import Todo from './components/models/Todo'
import TodoItem from './components/todos/TodoItem'

function App() {
  const [todos, setTodos] = useState<Todo[]>([]) // Initialize state
  const [filter, setFilter] = useState<filterTypes>(filterTypes.undone)

  const addTodo = (newTodo: Todo) => {
    // Assuming `todos` is an array
    localStorage.setItem('TODOS', JSON.stringify([...todos, newTodo]))
    setTodos([...todos, newTodo])
  }

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('TODOS') || '[]'))
  }, [])

  const deleteTodo = (id: string): void => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id))
    localStorage.setItem(
      'TODOS',
      JSON.stringify(todos.filter((todo: Todo) => todo.id !== id)),
    )
  }

  const editTodo = (id: string, updatedTitle: string): void => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.title = updatedTitle
      }
      return todo
    })
    setTodos(updatedTodos)
    localStorage.setItem('TODOS', JSON.stringify(updatedTodos))
  }

  const toggleTodoStatus = (id: string): void => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, is_done: !todo.is_done }
      }
      return todo
    })
    setTodos(updatedTodos)
    localStorage.setItem('TODOS', JSON.stringify(updatedTodos))
  }

  const filteredTodos = todos.filter((todo: Todo) =>
    filter === filterTypes.done ? todo.is_done : !todo.is_done,
  )

  return (
    <>
      <div className='App'>
        <Header />
        <main>
          <section className='jumbotron'>
            <div className='container d-flex flex-column align-items-center'>
              <h1 className='jumbotron-heading mt-4'>Never forget!</h1>
              <p className='lead text-muted'>
                Your to-do list is your mental net
              </p>
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
      </div>
    </>
  )
}

export default App
