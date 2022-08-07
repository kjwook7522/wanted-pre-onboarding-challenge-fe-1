import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import BoxTemplate from "@templates/BoxTemplate";
import useInput from "@hooks/useInput";

function LoginPage() {
  // router hook
  const navigate = useNavigate();

  // state
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");
  const [isFormValid, setIsFormValid] = useState(false);

  // handle function
  const handleForm: SubmitHandler = async event => {
    if (!isFormValid) return;

    event.preventDefault();

    const body = { email, password };
    try {
      const res = await axios.post("/users/login", body);

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        console.error(err);
        return;
      }

      if (err.response?.status === 400) {
        alert("아이디 혹은 비밀번호가 틀렸습니다");
      }
    }
  };

  useEffect(() => {
    if (!email.includes("@") && !password.includes(".")) {
      setIsFormValid(false);
      return;
    }

    if (password.length < 8) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
  }, [email, password]);

  return (
    <BoxTemplate>
      <$LoginHeaderContainer>
        <$LoginHeader1>Login</$LoginHeader1>
        <$LoginHeader2>원티드 프리온보딩 챌린지</$LoginHeader2>
      </$LoginHeaderContainer>

      <$LoginForm onSubmit={handleForm}>
        <$InputContainer>
          <$Input
            title="이메일"
            value={email}
            placeholder="이메일을 입력해주세요"
            type="email"
            required
            onChange={handleEmail}
          />
          <$Input
            title="비밀번호"
            value={password}
            placeholder="비밀번호를 입력해주세요"
            type="password"
            required
            onChange={handlePassword}
          />
        </$InputContainer>

        <$Submit disabled={!isFormValid} type="submit">
          입장
        </$Submit>
      </$LoginForm>
    </BoxTemplate>
  );
}

const $LoginHeaderContainer = styled.div`
  margin-bottom: 3.5rem;
`;

const $LoginHeader1 = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #44c3f8;
  text-align: center;
`;

const $LoginHeader2 = styled.h2`
  font-size: 2.2rem;
  font-weight: 500;
  color: #44c3f8;
  opacity: 0.7;
  text-align: center;
`;

const $LoginForm = styled.form``;

const $InputContainer = styled.div`
  margin-bottom: 3rem;
`;

const $Input = styled.input`
  width: 100%;
  display: block;
  padding: 0.8rem 1.2rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: #9ddffb;
  box-sizing: border-box;
  font-size: 1rem;
  color: #fff;
  transition: transform 0.3s, background-color 0.3s;

  :focus {
    outline: none;
    transform: scale(1.07);
    background-color: #44c3f8;
  }

  ::placeholder {
    color: #fff;
    opacity: 0.7;
  }
`;

const $Submit = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background-color: #9ddffb;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  :disabled {
    cursor: not-allowed;
  }

  :not(:disabled) {
    background-color: #44c3f8;

    :hover,
    :active {
      background-color: #09aff6;
    }
  }
`;

export default LoginPage;
