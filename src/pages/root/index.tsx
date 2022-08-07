import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import BoxTemplate from "@templates/BoxTemplate";
import TodoItem from "@components/item/TodoItem";
import SmallButton from "@components/button/SmallButton";
import useInput from "@hooks/useInput";

function RootPage() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, handleNewTodo, clearNewTodo] = useInput("");

  const handleAddForm: SubmitHandler = event => {
    event.preventDefault();

    const todo: Todo = {
      id: new Date().getTime(),
      title: newTodo,
      content: "",
      checked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTodos([...todos, todo]);
    clearNewTodo();
  };

  const handleTodoRemove: TodoRemoveHandler = id => {
    setTodos(todos.filter(todo => todo.id.toString() !== id));
  };

  const handleTodoChecked: TodoCheckedHandler = id => {
    const _todos = [...todos];

    const idx = _todos.findIndex(todo => todo.id.toString() === id);
    _todos[idx].checked = !_todos[idx].checked;

    setTodos(_todos);
  };

  const handleTodoEdit: TodoEditHandler = (id, text) => {
    const _todos = [...todos];

    const idx = _todos.findIndex(todo => todo.id.toString() === id);
    _todos[idx].title = text;

    setTodos(_todos);
  };

  useEffect(() => {
    const getTodos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth/login");
        return;
      }

      const headers = {
        Authorization: token,
      };

      const res = await axios.get("/todos", { headers });
      console.log(res);
    };

    getTodos();
  }, []);

  return (
    <BoxTemplate>
      <$TodoHeader>TO DO</$TodoHeader>

      <$TodoForm onSubmit={handleAddForm}>
        <$Input
          type="text"
          placeholder="새로운 할 일을 입력하세요"
          value={newTodo}
          onChange={handleNewTodo}
        />
        <$AddButtonWrapper>
          <SmallButton type="submit">추가</SmallButton>
        </$AddButtonWrapper>
      </$TodoForm>

      <$TodoList>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id.toString()}
            isChecked={todo.checked}
            todo={todo.title}
            onRemoved={handleTodoRemove}
            onChecked={handleTodoChecked}
            onEdited={handleTodoEdit}
          />
        ))}
      </$TodoList>
    </BoxTemplate>
  );
}

const $TodoHeader = styled.h1`
  margin-bottom: 3rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  color: #44c3f8;
`;

const $TodoForm = styled.form`
  position: relative;
  margin-bottom: 2rem;
`;

const $AddButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
`;

const $Input = styled.input`
  width: 100%;
  display: block;
  padding: 0.8rem 1.2rem;
  padding-right: 5rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: #9ddffb;
  box-sizing: border-box;
  font-size: 1rem;
  color: #fff;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #fff;
    opacity: 0.7;
  }
`;

const $TodoList = styled.ul`
  min-width: 500px;
  max-width: 1000px;
`;

export default RootPage;
