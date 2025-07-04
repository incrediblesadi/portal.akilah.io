import { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

interface Todo {
  id: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoContent, setNewTodoContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.get("api", "/todos", {});
      setTodos(response);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Failed to fetch todos. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function createTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodoContent.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await API.post("api", "/todos", {
        body: { content: newTodoContent }
      });
      setTodos([...todos, response]);
      setNewTodoContent("");
    } catch (err) {
      console.error("Error creating todo:", err);
      setError("Failed to create todo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteTodo(id: string) {
    setIsLoading(true);
    setError(null);
    try {
      await API.del("api", `/todos/${id}`, {});
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Failed to delete todo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main className="container mx-auto p-4 max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Todo App</h1>
            <button 
              onClick={signOut} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sign out
            </button>
          </div>
          
          <p className="mb-4">Hello, {user?.username}!</p>
          
          <form onSubmit={createTodo} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodoContent}
                onChange={(e) => setNewTodoContent(e.target.value)}
                placeholder="Enter a new todo"
                className="flex-1 border p-2 rounded"
              />
              <button 
                type="submit" 
                disabled={isLoading || !newTodoContent.trim()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                Add
              </button>
            </div>
          </form>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-2">
              {todos.length === 0 ? (
                <p>No todos yet. Add one above!</p>
              ) : (
                todos.map((todo) => (
                  <li 
                    key={todo.id} 
                    className="flex justify-between items-center border p-3 rounded"
                  >
                    <span>{todo.content}</span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </main>
      )}
    </Authenticator>
  );
}

export default App;
