type TodoAction =
  | { type: 'SET_NEW_TODO'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null }

  function todoReducer (
  state: { newTodo: string; error: string | null },
  action: TodoAction,
) {
  switch (action.type) {
    case 'SET_NEW_TODO':
      return { ...state, newTodo: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}
export default todoReducer