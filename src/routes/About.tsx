export default function About() {
  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-header text-center'>About Todo App</div>
        <div className='card-body'>
          <p className='card-text'>
            Welcome to the Todo App! This application is designed to help you
            manage your daily tasks. Whether you want to jot down a quick
            reminder or create a list of tasks for the week, this app is here to
            assist.
          </p>
          <strong>Features:</strong>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>Add, update, and delete tasks</li>
            <li className='list-group-item'>Mark tasks as complete</li>
            <li className='list-group-item'>
              Easy-to-use interface for a seamless experience
            </li>
          </ul>
        </div>
        <div className='card-footer text-muted text-center'>
          Thank you for choosing our Todo App!
        </div>
      </div>
    </div>
  )
}
