import React, { ChangeEventHandler, useCallback } from "react";
import { useRecoilState } from "recoil";
import { todoListState, TodoListType } from "../atoms/todoListState";

type Props = {
  item: TodoListType;
}

export const TodoItem: React.FC<Props> = ({ item }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);
  const editItemText: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }) => {
      const newList = replaceItemAtIndex(todoList, index, {
        ...item,
        text: value,
      });
      setTodoList(newList);
    },
    [index, item, setTodoList, todoList]
  );
  const toggleItemCompletion = useCallback(() => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isCompleted: !item.isCompleted,
    });
    setTodoList(newList);
  }, [index, item, setTodoList, todoList]);
  const deleteItem = useCallback(() => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  }, [index, setTodoList, todoList]);
  return (
    <>
      <input type='text' value={item.text} onChange={editItemText} />
      <input
        type='checkbox'
        checked={item.isCompleted}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </>
  )
}

function replaceItemAtIndex(
  arr: TodoListType[],
  index: number,
  newValue: TodoListType
) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: TodoListType[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}