import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SmallButton from "@components/button/SmallButton";
import Checkbox from "@components/input/Checkbox";
import useInput from "@hooks/useInput";

interface Props extends React.LiHTMLAttributes<HTMLLIElement> {
  isChecked?: boolean;
  onRemoved?: TodoRemoveHandler;
  onChecked?: TodoCheckedHandler;
  onEdited?: TodoEditHandler;
  todo?: string;
}

function TodoItem({ id = "", isChecked, onRemoved, onChecked, onEdited, todo, ...props }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, handleText] = useInput(todo ?? "");

  const handleRemove: ClickHandler<HTMLButtonElement> = event => {
    if (!onRemoved) return;

    onRemoved(id, event);
  };

  const handleChecked: ClickHandler<HTMLInputElement> = event => {
    if (!onChecked) return;

    onChecked(id, event);
  };

  const handleEditStart: ClickHandler<HTMLButtonElement> = () => {
    setIsEditing(true);
  };

  const handleEditOk: ClickHandler<HTMLButtonElement> = event => {
    setIsEditing(false);

    if (!onEdited) return;

    onEdited(id, text, event);
  };

  return (
    <$Li {...props} isChecked={isChecked}>
      <Checkbox id={id} onClick={handleChecked} />
      {isEditing ? (
        <$Input type="text" isChecked={isChecked} value={text} onChange={handleText} />
      ) : (
        <Link to={`/${id}`}>{todo}</Link>
      )}

      {isEditing ? (
        <$ButtonContainer className="container">
          <SmallButton theme="sub" onClick={handleEditOk}>
            완료
          </SmallButton>
        </$ButtonContainer>
      ) : (
        <$ButtonContainer className="container">
          <SmallButton theme="sub" onClick={handleEditStart}>
            수정
          </SmallButton>
          <SmallButton theme="delete" onClick={handleRemove}>
            삭제
          </SmallButton>
        </$ButtonContainer>
      )}
    </$Li>
  );
}

const $Li = styled.li<{ isChecked?: boolean }>`
  padding: 1.2rem 1rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 12px;
  text-decoration: ${props => props.isChecked && "line-through"};
  transition: transform 0.3s;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    transform: scale(1.04);

    .container {
      display: block;
    }
  }
`;

const $Input = styled.input<{ isChecked?: boolean }>`
  width: 80%;
  margin: 0;
  padding: 0;
  display: block;
  border: none;
  background-color: transparent;
  line-height: 1.5;
  font-size: 1rem;
  color: #44c3f8;
  text-decoration: ${props => props.isChecked && "line-through"};
  text-decoration-color: ${props => props.isChecked && "#44c3f8"};

  :focus {
    outline: none;
  }
`;

const $ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  display: none;
`;

export default TodoItem;
