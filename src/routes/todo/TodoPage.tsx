import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Todo from '../../components/models/Todo'

type TodoItem = {
  id: string
  title: string
  is_done: boolean
}

type TodoParams = {
  id?: string
  title?: string
}

const TodoPage: React.FC = () => {
  const params = useParams<TodoParams>()
  const todos = JSON.parse(localStorage.getItem('TODOS') || '[]') as TodoItem[]
  const tishTodo = todos.find(t => t.id === params.id)
  const [todo, setTodo] = useState<Todo | undefined>(tishTodo) // Initialize state

  // Getting the status from the matched todo item or defaulting to false
  const status = todo?.is_done || false

  const toggleTodoStatus = (id: string): void => {
    const updatedTodos = todos.map(todoItem =>
      todoItem.id === id
        ? { ...todoItem, is_done: !todoItem.is_done }
        : todoItem,
    )
    const updatedTodo = updatedTodos.find(t => t.id === id)

    localStorage.setItem('TODOS', JSON.stringify(updatedTodos))
    if (updatedTodo) setTodo(updatedTodo) // Update the single todo state
    toast('Status changed.')
  }

  return (
    <div className='container mt-5'>
      <div className='card shadow'>
        <h2 className='card-header text-center bg-primary text-white'>
          {todo?.title || 'No Title Provided'}
        </h2>
        <div className='card-body'>
          <p className='card-text'>
            Todo item with ID:{' '}
            <span className='font-weight-bold'>
              {params.id || 'Not Provided'}
            </span>
          </p>
          <p className='card-text'>
            Status:
            <span className={status ? 'text-success ml-2' : 'text-danger ml-2'}>
              {status ? (
                <i className='fa fa-check-circle'></i>
              ) : (
                <i className='fa fa-times-circle'></i>
              )}
              {status ? 'Done' : 'Undone'}
            </span>
          </p>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center rounded'>
        <Link to='/' className='btn btn-secondary mt-3'>
          <i className='fa fa-arrow-left'></i> Back to Home
        </Link>
        <div>
          <button
            type='button'
            className={`btn btn-sm me-1 ${
              todo?.is_done ? ' btn-secondary' : 'btn-success'
            } `}
            onClick={() => toggleTodoStatus(todo!.id!)}
          >
            {todo?.is_done ? 'Undone' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoPage
