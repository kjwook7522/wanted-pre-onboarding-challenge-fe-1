import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import BoxTemplate from "@templates/BoxTemplate";
import useInput from "@hooks/useInput";

function SignupPage() {
  // router hook
  const navigate = useNavigate();

  // state
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");
  const [isFormValid, setIsFormValid] = useState(false);

  // handle function
  const handleForm: React.FormEventHandler<HTMLFormElement> = async event => {
    if (!isFormValid) return;

    event.preventDefault();

    const body = { email, password };
    try {
      const res = await axios.post("/users/create", body);

      localStorage.setItem("token", res.data.token);
      alert("축하합니다\n정상으로 가입되셨습니다");
      navigate("/");
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        console.error(err);
        return;
      }

      if (err.response?.status === 409) {
        alert("중복으로 가입된 이메일이 존재합니다");
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
      <$SignupHeaderContainer>
        <$SignupHeader1>Signup</$SignupHeader1>
        <$SignupHeader2>원티드 프리온보딩 챌린지</$SignupHeader2>
      </$SignupHeaderContainer>

      <$SignupForm onSubmit={handleForm}>
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
          회원가입
        </$Submit>
      </$SignupForm>

      <$Description>비밀번호는 8자 이상이어야 합니다</$Description>
    </BoxTemplate>
  );
}

const $SignupHeaderContainer = styled.div`
  margin-bottom: 3.5rem;
`;

const $SignupHeader1 = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #44c3f8;
  text-align: center;
`;

const $SignupHeader2 = styled.h2`
  font-size: 2.2rem;
  font-weight: 500;
  color: #44c3f8;
  opacity: 0.7;
  text-align: center;
`;

const $SignupForm = styled.form``;

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
  margin-bottom: 1rem;
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

const $Description = styled.p`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.2;
`;

export default SignupPage;
