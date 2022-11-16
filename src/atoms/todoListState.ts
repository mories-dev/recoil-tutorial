import { atom } from 'recoil'

export type TodoListType = {
  id: number;
  text: string;
  isCompleted: boolean;
}

export const todoListState = atom<TodoListType[]>({
  key: 'todoListState',
  default: [],
})