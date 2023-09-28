import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const params = useParams<TodoParams>()
  const todos = JSON.parse(localStorage.getItem('TODOS') || '[]') as TodoItem[]
  const tishTodo = todos.find(t => t.id === params.id)
  const [todo, setTodo] = useState<Todo | undefined>(tishTodo) // Initialize state
  const [isEditing, setIsEditing] = useState(false)

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

  const deleteTodo = (id: string): void => {
    const updatedTodos = todos.filter(todoItem => todoItem.id !== id)
    localStorage.setItem('TODOS', JSON.stringify(updatedTodos))
    const updatedTodo = updatedTodos.find(t => t.id === id)
    if (updatedTodo) setTodo(updatedTodo) // Update the single todo state
    navigate('/')
  }

  const titleRef = React.useRef<HTMLHeadingElement>(null)

  const handleEdit = () => {
    const updatedTitle = titleRef.current?.textContent || ''
    editTodo(todo!.id!, updatedTitle)
    setIsEditing(false)
  }

  const editTodo = (id: string, updatedTitle: string): void => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title: updatedTitle } : todo,
    )
    localStorage.setItem('TODOS', JSON.stringify(updatedTodos))
    const updatedTodo = updatedTodos.find(t => t.id === id)
    setTodo(updatedTodo)
    toast.success('Updated.')
  }

  return (
    <div className='container mt-5'>
      <div className='card shadow'>
        <h2
          ref={titleRef} // Attach a reference to the DOM element
          className='card-header text-center bg-primary text-white'
          contentEditable={isEditing} // Make the content of the <h2> editable based on the `isEditing` state
        >
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
        {isEditing ? (
          <>
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
              <button
                type='button'
                className='btn btn-info btn-sm me-1'
                onClick={() => {
                  setIsEditing(true)
                  setTimeout(() => {
                    const node = titleRef.current
                    if (node) {
                      const selection = window.getSelection() // Get the current selection object. This represents what's currently selected/highlighted in the browser.
                      const range = document.createRange() // Create a new "range". A range represents a portion of a document.
                      range.selectNodeContents(node) // Set the range to select the entire content of our h2 element
                      range.collapse(false) // false means collapse to the end
                      selection?.removeAllRanges() // Clear any existing selections.
                      selection?.addRange(range) // Apply our new range, which effectively moves the cursor to the end of the h2 content
                    }
                  }, 0)
                }}
              >
                Edit
              </button>
              <button
                type='button'
                className='btn btn-danger btn-sm ml-1'
                onClick={() => {
                  deleteTodo(todo!.id!)
                  toast.error(todo?.title + ' deleted successfully!')
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

export default TodoPage
