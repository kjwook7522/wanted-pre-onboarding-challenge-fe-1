declare interface Todo {
  id: number;
  title: string;
  content: string;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

declare type TodoRemoveHandler = (
  id: string,
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

declare type TodoCheckedHandler = (
  id: string,
  event: React.MouseEvent<HTMLInputElement, MouseEvent>
) => void;

declare type TodoEditHandler = (
  id: string,
  text: string,
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;
