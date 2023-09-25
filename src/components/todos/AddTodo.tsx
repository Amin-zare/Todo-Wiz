import React, { useState, useContext } from 'react';
import TodosContext from './../../Context/Todos';

const AddTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>('') // Declare type for state
  const [error, setError] = useState<string | null>(null) // To handle error messages
  const todosContext = useContext(TodosContext); // Access the context

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newTodo) {
      setError('Please enter a todo')
      return
    }

    setError(null)

    todosContext?.addTodo({
      title: newTodo,
      is_done: false,
      id: Math.random().toString(),
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
