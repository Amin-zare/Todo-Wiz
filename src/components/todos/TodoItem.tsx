import React from 'react'

const TodoItem: React.FC = () => {
  return (
    <div className='col-6 mb-2'>
      <div className='d-flex justify-content-between align-items-center border rounded p-3'>
        <div>Do something</div>
        <div>
          <button
            type='button'
            className='btn btn-info btn-sm me-1'
          >
            edit
          </button>
          <button
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