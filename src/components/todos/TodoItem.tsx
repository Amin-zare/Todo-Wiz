import React, { useReducer } from 'react'
import Todo from '../models/Todo'

interface Props {
  todo: Todo
  deleteTodo: (id: string) => void
  editTodo: (id: string, updatedTitle: string) => void
  toggleTodoStatus: (id: string, is_done: boolean) => void
}

type TodoAction =
  | { type: 'SET_IS_EDITING'; payload: boolean }
  | { type: 'SET_NEW_TITLE'; payload: string }

const todoReducer = (
  state: { isEditing: boolean; newTitle: string },
  action: TodoAction,
) => {
  switch (action.type) {
    case 'SET_IS_EDITING':
      return { ...state, isEditing: action.payload }
    case 'SET_NEW_TITLE':
      return { ...state, newTitle: action.payload }
    default:
      return state
  }
}

const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  editTodo,
  toggleTodoStatus,
}) => {
  const [state, dispatch] = useReducer(todoReducer, {
    isEditing: false,
    newTitle: todo.title,
  })

  const handleEdit = () => {
    editTodo(todo.id!, state.newTitle)
    dispatch({ type: 'SET_IS_EDITING', payload: false })
  }

  return (
    <div className='col-6 mb-2'>
      <div className='d-flex justify-content-between align-items-center border rounded p-3'>
        {state.isEditing ? (
          <>
            <input
              id='saveTodo'
              type='text'
              value={state.newTitle}
              onChange={e =>
                dispatch({ type: 'SET_NEW_TITLE', payload: e.target.value })
              }
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
                onClick={() => toggleTodoStatus(todo.id!, todo.is_done)}
              >
                {todo.is_done ? 'Undone' : 'Done'}
              </button>
              <button
                type='button'
                className='btn btn-info btn-sm me-1'
                onClick={() =>
                  dispatch({ type: 'SET_IS_EDITING', payload: true })
                }
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
