import React, { useState } from "react";

type HookReturn = [string, React.ChangeEventHandler<HTMLInputElement>];

function useInput(initValue: string): HookReturn {
  const [input, setInput] = useState(initValue);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = event => {
    setInput(event.target.value);
  };

  return [input, handleInput];
}

export default useInput;
