import React from 'react'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

type SearchParamsType = {
  id?: string | null
  title?: string | null
  status?: 'true' | 'false' | null
}

const TodoPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const params: SearchParamsType = {
    id: searchParams.get('id'),
    title: searchParams.get('title'),
    status: searchParams.get('status') as 'true' | 'false',
  }

  const status = params.status === 'true'

  return (
    <div className='container mt-5'>
      <div className='card shadow'>
        <h2 className='card-header text-center bg-primary text-white'>
          {params.title || 'No Title Provided'}
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
