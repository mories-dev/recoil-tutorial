import React, { ChangeEventHandler, useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../atoms/todoListState";

export const TodoItemCreator: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);
  const addItem = useCallback(() => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isCompleted: false,
      },
    ]);
    setInputValue('');
  }, [inputValue, setTodoList]);
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }) => {
      setInputValue(value);
    },
    []
  );
  return (
    <>
      <input type='text' value={inputValue} onChange={onChange} />
      <button onClick={addItem}>追加</button>
    </>
  );
};

let id = 0;
function getId() {
  return id++;
}