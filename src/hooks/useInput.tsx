import React, { useState } from "react";

type HookReturn = [string, React.ChangeEventHandler<HTMLInputElement>, () => void];

function useInput(initValue: string): HookReturn {
  const [input, setInput] = useState(initValue);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = event => {
    setInput(event.target.value);
  };

  const clear = (): void => {
    setInput("");
  };

  return [input, handleInput, clear];
}

export default useInput;
