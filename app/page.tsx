"use client";

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data.data);
  };

  const addTodo = async () => {
    if(newTodo) {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTodo }),
      });
      const data = await res.json();
      setTodos((prevTodos) => [...prevTodos, data.data]);
      setNewTodo("");
    } else {
      alert("Item must not be empty!")
    }
  };

  const updateTodo = async (id: string, completed: boolean) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });
    const data = await res.json();
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === id ? data.data : todo))
    );
  };

  const deleteTodo = async (id: string) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } else {
      console.error("Failed to delete todo");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  return (
    <section className="min-h-screen bg-[#799351] text-black p-20">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-bold mb-12">Todo List</h1>
        <div className="flex justify-between mb-12">
          <input
            type="text"
            onKeyDown={handleKeyDown}
            value={newTodo}
            className="bg-white border-2 border-black rounded-lg w-max h-12 text-xl p-4 mr-4"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTodo(e.target.value)
            }
          />
          <button
            className="border-black border-2 rounded-lg h-12 p-4 flex items-center bg-[#A1DD70]"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </div>

        <ul className="w-6/12">
          {todos.map((todo) => (
            <li key={todo._id} className="mb-8 flex justify-between w-full items-center">
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                className="text-2xl cursor-pointer mr-8"
                onClick={() => updateTodo(todo._id, !todo.completed)}
              >
                {todo.text}
              </span>
              <button 
                className="cursor-pointer border-black border-2 rounded-lg p-2"
                onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
