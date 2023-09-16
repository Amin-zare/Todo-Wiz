import 'bootstrap/dist/css/bootstrap.css'
import Header from './components/layouts/Header'
import AddTodo from './components/todos/AddTodo'
import TodoItem from './components/todos/TodoItem'
import { useState } from 'react'
import Todo from './components/models/Todo'

function App() {
  const [todos, setTodos] = useState<Todo[]>([]) // Initialize state

  const addTodo = (newTodo: Todo) => {
    // Assuming `todos` is an array
    setTodos([...todos, newTodo])
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
                <TodoItem />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
