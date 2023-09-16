import React, { useState } from 'react'
import Todo from '../models/Todo'

interface Props {
  todo: Todo
  deleteTodo: (id: string) => void
  editTodo: (id: string, updatedTitle: string) => void
}

const TodoItem: React.FC<Props> = ({ todo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(todo.title)
  const handleEdit = () => {
    editTodo(todo.id!, newTitle)
    setIsEditing(false)
  }

  return (
    <div className='col-6 mb-2'>
      <div className='d-flex justify-content-between align-items-center border rounded p-3'>
        {isEditing ? (
          <>
            <input
              type='text'
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
            <button
              type='button'
              className='btn btn-success btn-sm me-1'
              onClick={handleEdit}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <div>{todo.title}</div>
            <div>
              <button
                type='button'
                className='btn btn-info btn-sm me-1'
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                type='button'
                className='btn btn-danger btn-sm ml-1'
                onClick={() => deleteTodo(todo.id!)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoItem
