import 'bootstrap/dist/css/bootstrap.css'
import Header from './components/layouts/Header'
import AddTodo from './components/todos/AddTodo'
import TodoItem from './components/todos/TodoItem'
import { useEffect, useState } from 'react'
import todosApi from '../src/api/apiInstance'
import Todo from './components/models/Todo'

function App() {
  const [todos, setTodos] = useState<Todo[]>([]) // Initialize state

  const addTodo = (newTodo: Todo) => {
    // Assuming `todos` is an array
    setTodos([...todos, newTodo])
  }
  useEffect(() => {
    todosApi
      .get(`/todos.json`)
      .then(response => jsonHandler(response.data))
      .catch(err => console.log(err))
  }, [])

  const jsonHandler = (data: Todo) => {
    const fetchedTodos = Object.entries(data).map(([id, value]) => {
      return {
        ...value,
        id,
      }
    })
    setTodos(fetchedTodos)
  }

  const deleteTodo = (id: string): void => {
    todosApi
      .delete(`/todos/${id}.json`)
      .then(response => {
        console.log(response)
        setTodos(todos.filter((todo: Todo) => todo.id !== id))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const editTodo = (id: string, updatedTitle: string): void => {
    todosApi
      .patch(`/todos/${id}.json`, { title: updatedTitle })
      .then(() => {
        // Update the state only if the API call is successful
        const updatedTodos = todos.map(todo => {
          if (todo.id === id) {
            todo.title = updatedTitle
          }
          return todo
        })
        setTodos(updatedTodos)
      })
      .catch(error => {
        console.log('Error updating todo:', error)
      })
  }

  return (
    <>
      <div className='App'>
        <Header />
        <main>
          <section className='jumbotron'>
            <div className='container d-flex flex-column align-items-center'>
              <h1 className='jumbotron-heading'>Never forget!</h1>
              <p className='lead text-muted'>
                your to-do list is your mental net
              </p>
              <AddTodo addTodo={addTodo} />
            </div>
          </section>
          <div className='todosList'>
            <div className='container'>
              <div className='d-flex flex-column align-items-center '>
                <nav className='col-6 mb-3'>
                  <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                    <a
                      className='nav-item nav-link active font-weight-bold'
                      id='nav-home-tab'
                    >
                      undone <span className=' badge-secondary'>9</span>
                    </a>
                    <a
                      className='nav-item nav-link font-weight-bold'
                      id='nav-profile-tab'
                    >
                      done <span className=' badge-success'>9</span>
                    </a>
                  </div>
                </nav>
                {todos.map((todo: Todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
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
