import React, { useCallback, useRef, useState } from "react";

import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoApp() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'test value1',
      done: true
    },
    {
      id: 2,
      text: 'test value2',
      done: true
    }
  ]);
  const nextId = useRef(3);

  const onInsert = useCallback(text => {
    setTodos([...todos, {
      id: nextId.current,
      text,
      done: false
    }])
    nextId.current += 1;
  }, [todos]);

  const onToggle = useCallback(id => {
    setTodos(todos => 
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []);

  const onRemove = useCallback(id => {
    setTodos(todos => 
      todos.filter(todo => todo.id !== id)
    );
  }, []);

  return (
    <>
      <TodoForm onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </>
  );
};

export default TodoApp;
