export default function Contact() {
  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-header text-center'>Contact Us</div>
        <div className='card-body'>
          <p className='card-text'>
            If you have any questions or issues, feel free to{' '}
            <a
              target='_blank'
              href='https://github.com/Amin-zare/Todo-Wiz/issues'
            >
              open an issue
            </a>{' '}
            on the repository.
          </p>
        </div>
        <div className='card-footer text-muted text-center'>
          Thank you for choosing our Todo App!
        </div>
      </div>
    </div>
  )
}
