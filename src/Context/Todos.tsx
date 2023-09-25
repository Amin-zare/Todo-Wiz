import { createContext } from "react";
import Todo from "../components/models/Todo";

interface TodosContext {
    addTodo: (newTodo: Todo) => void;

  }

  // Create a context for TodosContext with an initial value of undefined
  const todosContext = createContext<TodosContext | undefined>(undefined);
// - We use 'TodosContext | undefined' to indicate that the context may or may not be provided.

export default todosContext;