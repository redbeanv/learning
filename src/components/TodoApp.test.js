import React from "react";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import TodoApp from "./TodoApp";

describe('TodoApp', () => {
  test('renders TodoForm and TodoList', () => {
    const { getByText, getByTestId } = render(<TodoApp />);
    getByText('등록');
    getByTestId('TodoList');
  });

  test('renders two defaults todos', () => {
    const { getByText } = render(<TodoApp />);
    getByText('test value1');
    getByText('test value2');
  });

  test('creates new todo', () => {
    const { getByText, getByPlaceholderText } = render(<TodoApp />);
    fireEvent.change(getByPlaceholderText('할 일을 입력하세요'), {
      target: {
        value: '새 항목 추가하기'
      }
    })
    fireEvent.click(getByText('등록'));
    getByText('새 항목 추가하기');
  });

  test('toggels todo', () => {
    const { getByText } = render(<TodoApp />);
    const todoText = getByText('test value1');
    expect(todoText).toHaveStyle('text-decoration: line-through;');

    fireEvent.click(todoText);
    expect(todoText).not.toHaveStyle('text-decoration: line-through;');

    fireEvent.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: line-through;');
  });

  test('removes todo', () => {
    const { getByText } = render(<TodoApp />);
    const todoText = getByText('test value1');
    const removeButton = todoText.nextSibling;

    fireEvent.click(removeButton);
    expect(todoText).not.toBeInTheDocument();
  });
});
