import React, { useState } from 'react'
import Todo from '../models/Todo'
import { Toaster, toast } from 'sonner'
import { Link } from 'react-router-dom'

interface Props {
  todo: Todo
  deleteTodo: (id: string) => void
  editTodo: (id: string, updatedTitle: string) => void
  toggleTodoStatus: (id: string, is_done: boolean) => void
}

const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  editTodo,
  toggleTodoStatus,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(todo.title)
  const handleEdit = () => {
    editTodo(todo.id!, newTitle)
    setIsEditing(false)
  }

  return (
    <div className='col-6 mb-2'>
      <Toaster richColors position='top-right' />
      <div className='d-flex justify-content-between align-items-center border rounded p-3'>
        {isEditing ? (
          <>
            <input
              id='saveTodo'
              type='text'
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleEdit()
                }
              }}
              ref={inputRef => inputRef && inputRef.focus()}
            />
            <button
              type='button'
              className='btn btn-success btn-sm me-1'
              onClick={handleEdit}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <Link
              to={{ pathname: `/todo/${todo.id}` }}
              className='link-dark tex text-decoration-none'
            >
              {todo.title}
            </Link>
            <div>
              <button
                type='button'
                className={`btn btn-sm me-1 ${
                  todo.is_done ? ' btn-secondary' : 'btn-success'
                } `}
                onClick={() => toggleTodoStatus(todo.id!, todo.is_done)}
              >
                {todo.is_done ? 'Undone' : 'Done'}
              </button>
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
                onClick={() => {
                  deleteTodo(todo.id!)
                  toast.error(todo.title + ' deleted successfully!')
                }}
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
