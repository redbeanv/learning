import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import TodoList from './TodoList';

describe('TodoList', () => {
  const sampleTodos = [
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
  ];

  test('renders todos properly', () => {
    const { getByText } = render(<TodoList todos={sampleTodos} />);
    getByText(sampleTodos[0].text);
    getByText(sampleTodos[1].text);
  });

  test('renders todos properly', () => {
    const onToggle = jest.fn();
    const onRemove = jest.fn();
    const { getByText, getAllByText } = render(<TodoList todos={sampleTodos} onToggle={onToggle} onRemove={onRemove} />);

    fireEvent.click(getByText(sampleTodos[0].text));
    expect(onToggle).toBeCalledWith(sampleTodos[0].id);

    fireEvent.click(getAllByText('삭제')[0]);
    expect(onRemove).toBeCalledWith(sampleTodos[0].id);
  });
});
