const AddTodo: React.FC = () => {
  return (
    <div className="form-inline">
      <div className="form-group d-flex">
        <input type="text" className="form-control mx-sm-3" placeholder="i want to do ..." />
        <button className="btn btn-primary">add</button>
      </div>
    </div>
  )
}

export default AddTodo;