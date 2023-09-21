import React, { useReducer } from 'react'
import Todo from '../models/Todo'

// Define the type for the props expected by AddTodo
interface Props {
  addTodo: (todo: Todo) => void
}

type TodoAction =
  | { type: 'SET_NEW_TODO'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null }

const todoReducer = (
  state: { newTodo: string; error: string | null },
  action: TodoAction,
) => {
  switch (action.type) {
    case 'SET_NEW_TODO':
      return { ...state, newTodo: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

const AddTodo: React.FC<Props> = ({ addTodo }) => {
  // const [newTodo, setNewTodo] = useState<string>('') // Declare type for state
  // const [error, setError] = useState<string | null>(null) // To handle error messages

  const [state, dispatch] = useReducer(todoReducer, {
    newTodo: '', // Initialize with an empty string
    error: null, // Initialize error as null
  })

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    if (!state.newTodo) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a todo' })
      return
    }

    dispatch({ type: 'SET_ERROR', payload: null })

    addTodo({
      title: state.newTodo,
      is_done: false,
      id: Math.random().toString(),
    })

    // setNewTodo('')
    dispatch({ type: 'SET_NEW_TODO', payload: '' })
  }

  return (
    <form onSubmit={submitHandler} className='form-inline'>
      <div className='form-group d-flex'>
        <input
          id='newTodo'
          value={state.newTodo}
          onChange={e =>
            dispatch({ type: 'SET_NEW_TODO', payload: e.target.value })
          }
          type='text'
          className='form-control mx-sm-3'
          placeholder='I want to do ...'
          ref={inputRef => inputRef && inputRef.focus()}
        />
        <button type='submit' className='btn btn-primary'>
          Add
        </button>
      </div>
      {state.error && (
        <div className='alert alert-danger mt-2'>{state.error}</div>
      )}
    </form>
  )
}

export default AddTodo
