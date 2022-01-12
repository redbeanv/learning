import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import TodoForm from "./TodoForm";

describe('TodoForm', () => {
  const setup = (props = {}) => {
    const utils = render(<TodoForm {...props} />);
    const { getByText, getByPlaceholderText } = utils;
    const input = getByPlaceholderText('할 일을 입력하세요');
    const button = getByText('등록');
    return { ...utils, input, button };
  }

  test('should have input and a button', () => {
    const { input, button } = setup();
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  test('change input', () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: 'Test value'
      }
    });
    expect(input).toHaveAttribute('value', 'Test value');
  });

  test('calls onInsert and clears input', () => {
    const onInsert = jest.fn();
    const { input, button } = setup({ onInsert });

    fireEvent.change(input, {
      target: {
        value: 'Test value'
      }
    });

    fireEvent.click(button);
    expect(onInsert).toBeCalledWith('Test value');
    expect(input).toHaveAttribute('value', '');
  });
});
