import React from 'react'
import Todo from '../models/Todo'

interface Props {
  todo: Todo
  deleteTodo: (id: string) => void
}

const TodoItem: React.FC<Props> = ({ todo, deleteTodo }) => {
  return (
    <div className='col-6 mb-2'>
      <div className='d-flex justify-content-between align-items-center border rounded p-3'>
        <div>{todo.title}</div>
        <div>
          <button type='button' className='btn btn-info btn-sm me-1'>
            edit
          </button>
          <button
            onClick={() => deleteTodo(todo.id!)}
            type='button'
            className='btn btn-danger btn-sm ml-1'
          >
            delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem
