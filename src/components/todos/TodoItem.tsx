import React, { useContext, useState } from 'react'
import Todo from '../models/Todo'
import { Toaster, toast } from 'sonner'
import TodosContext from './../../Context/Todos';

interface Props {
  todo: Todo
}

const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const todosContext = useContext(TodosContext); // Access the context
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(todo.title)
  const handleEdit = () => {
    todosContext?.editTodo(todo.id!, newTitle)
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
              ref={editInputRef => editInputRef && editInputRef.focus()}
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
            <div>{todo.title}</div>
            <div>
              <button
                type='button'
                className={`btn btn-sm me-1 ${
                  todo.is_done ? ' btn-secondary' : 'btn-success'
                } `}
                onClick={() => todosContext?.toggleTodoStatus(todo.id!, todo.is_done)}
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
                  todosContext?.deleteTodo(todo.id!)
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
