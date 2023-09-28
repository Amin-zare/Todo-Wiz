import React from 'react'
import { Link, useParams } from 'react-router-dom'

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

  const todo = todos.find(t => t.id === params.id)

  // Getting the status from the matched todo item or defaulting to false
  const status = todo?.is_done || false
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
      <Link to='/' className='btn btn-secondary mt-3'>
        <i className='fa fa-arrow-left'></i> Back to Home
      </Link>
    </div>
  )
}

export default TodoPage
