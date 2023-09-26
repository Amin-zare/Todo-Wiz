import { filterTypes } from "../enums/filterTypes";
import Todo from "../models/Todo";

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'EDIT_TODO'; payload: { id: string; title: string } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO_STATUS'; payload: string }
  | { type: 'FILTER_TODOS'; payload: filterTypes }
  | { type: 'INITIALIZE_TODOS'; payload: Todo[] }

  interface TodoState {
    todos: Todo[]
    filter: filterTypes
  }
  
function todoReducer(state: TodoState, action: TodoAction) {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: [...state.todos, action.payload],
        }
      case 'EDIT_TODO':
        return {
          ...state,
          todos: state.todos.map((todo: Todo) => {
            if (todo.id === action.payload.id) {
              todo.title = action.payload.title
            }
            return todo
          }),
        }
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
        }
      case 'TOGGLE_TODO_STATUS':
        return {
          ...state,
          todos: state.todos.map((todo: Todo) => {
            if (todo.id === action.payload) {
              return { ...todo, is_done: !todo.is_done }
            }
            return todo
          }),
        }
      case 'FILTER_TODOS':
        return {
          ...state,
          filter: action.payload,
        }
  
      case 'INITIALIZE_TODOS':
        return {
          ...state,
          todos: action.payload,
        }
  
      default:
        return state
    }
  }

export default todoReducer;