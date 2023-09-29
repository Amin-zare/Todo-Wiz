export default function NotFound() {
  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-body text-center'>
          <h1 className='display-4'>404</h1>
          <p className='lead'>
            Oops! The page you're looking for cannot be found.
          </p>
          <p>
            It might have been removed, renamed, or did not exist in the first
            place.
          </p>
          <a href='/' className='btn btn-primary'>
            Return to Home
          </a>
        </div>
      </div>
    </div>
  )
}
