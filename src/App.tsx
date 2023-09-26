import 'bootstrap/dist/css/bootstrap.css'
import { filterTypes } from './components/enums/filterTypes'
import { useEffect, useReducer } from 'react'
import AddTodo from './components/todos/AddTodo'
import Header from './components/layouts/Header'
import Todo from './components/models/Todo'
import TodoItem from './components/todos/TodoItem'
import todoReducer from './components/reducers/appReducer'

const initialState = {
  todos: [],
  filter: filterTypes.undone,
}


function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = (newTodo: Todo) => {
    // Always Update localStorage first
    const updatedTodos = [...state.todos, newTodo]
    localStorage.setItem('TODOS', JSON.stringify(updatedTodos))

    // Then dispatch the action to update the state!
    dispatch({ type: 'ADD_TODO', payload: newTodo })
  }

  const editTodo = (id: string, updatedTitle: string): void => {
    dispatch({ type: 'EDIT_TODO', payload: { id, title: updatedTitle } })
  }

  const deleteTodo = (id: string) => {
    // Update localStorage first
    const updatedTodos = state.todos.filter((todo: Todo) => todo.id !== id)
    localStorage.setItem('TODOS', JSON.stringify(updatedTodos))

    // Then dispatch the action to update the state
    dispatch({ type: 'DELETE_TODO', payload: id })
  }

  const toggleTodoStatus = (id: string): void => {
    dispatch({ type: 'TOGGLE_TODO_STATUS', payload: id })
    // Tip: Don't need to update localStorage here, it's handled in the reducer
  }

  const filteredTodos = state.todos.filter((todo: Todo) =>
    state.filter === filterTypes.done ? todo.is_done : !todo.is_done,
  )

  const setFilter = (newFilter: filterTypes) => {
    // Dispatch the SET_FILTER action
    dispatch({ type: 'FILTER_TODOS', payload: newFilter })

    // You can also update localStorage with the new filter value if needed
    localStorage.setItem('FILTER', JSON.stringify(newFilter))
  }

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('TODOS') || '[]')

    dispatch({ type: 'INITIALIZE_TODOS', payload: savedTodos })
  }, [])

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
                    <button
                      onClick={() => setFilter(filterTypes.undone)}
                      className={`nav-item nav-link font-weight-bold ${
                        state.filter === filterTypes.undone ? 'active' : ''
                      }`}
                      id='nav-home-tab'
                      role='button'
                    >
                      💬 Undone&nbsp;
                      <span className=' badge-secondary'>
                        {
                          state.todos.filter(item => item.is_done === false)
                            .length
                        }
                      </span>
                    </button>
                    <button
                      onClick={() => setFilter(filterTypes.done)}
                      className={`'nav-item nav-link font-weight-bold' ${
                        state.filter === filterTypes.done ? 'active' : ''
                      }`}
                      id='nav-profile-tab'
                      role='button'
                    >
                      ✅ Done&nbsp;
                      <span className=' badge-success'>
                        {
                          state.todos.filter(item => item.is_done === true)
                            .length
                        }
                      </span>
                    </button>
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
