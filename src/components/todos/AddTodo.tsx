import React, { useState } from 'react'
import Todo from '../models/Todo'

// Define the type for the props expected by AddTodo
interface Props {
  addTodo: (todo: Todo) => void
}

const AddTodo: React.FC<Props> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>('') // Declare type for state
  const [error, setError] = useState<string | null>(null) // To handle error messages

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newTodo) {
      setError('Please enter a todo')
      return
    }

    setError(null)

    addTodo({
      title: newTodo,
      is_done: false,
      id: Math.floor(Math.random() * 1000000).toString(),
    })

    setNewTodo('')
  }

  return (
    <form onSubmit={submitHandler} className='form-inline'>
      <div className='form-group d-flex'>
        <input
          id='newTodo'
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          type='text'
          className='form-control mx-sm-3'
          placeholder='I want to do ...'
          ref={inputRef => inputRef && inputRef.focus()}
        />
        <button type='submit' className='btn btn-primary'>
          Add
        </button>
      </div>
      {error && <div className='alert alert-danger mt-2'>{error}</div>}
    </form>
  )
}

export default AddTodo
