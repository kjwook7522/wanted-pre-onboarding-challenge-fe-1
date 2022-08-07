import React from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

function Checkbox({ id = "", ...props }: Props) {
  return (
    <>
      <$Input id={id} type="checkbox" {...props} />
      <$Box htmlFor={id}></$Box>
    </>
  );
}

const $Input = styled.input`
  display: none;

  :checked + label {
    border-color: #09aff6;
    background-color: #44c3f8;
  }
`;

const $Box = styled.label`
  width: 1em;
  height: 1em;
  display: inline-block;
  border: 2px solid #333;
  border-radius: 5px;
  cursor: pointer;
`;

export default Checkbox;
