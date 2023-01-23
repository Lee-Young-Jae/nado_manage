import React, { useEffect, useState } from "react";
import LabeledInput from "../Components/Patterns/LabeledInput";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN_REQUEST } from "../modules/reducers/user";
import Button from "../Components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "../Components/common/Dialog";
import styled from "styled-components";
import hamberger from "../Icons/hamberger.png";
import Flex from "../Components/common/Flex";

const LoginPageStyle = styled.div`
  padding: 2rem;
`;
const SubTitle = styled.div`
  color: #395ad9;
  text-align: left;
  vertical-align: text-middle;
  font-size: 19px;
  font-family: Noto Sans KR;
  line-height: auto;
  border-style: hidden;
  outline: none;
  left: 83px;
  top: 147px;
  width: 242px;
`;

const SubContentLink = styled(Link)`
  color: #b5b5b5;
  text-align: right;
  vertical-align: text-middle;
  font-size: 12px;
  font-family: Noto Sans KR;
  line-height: auto;
  border-style: hidden;
  outline: none;
  // 링크 스타일 제거
  text-decoration: none;
  cursor: pointer;
  margin-right: 5px;
`;

const HambergerImg = styled.img.attrs({ src: `${hamberger}` })`
  width: 20px;
  height: 20px;
  border-style: hidden;
  outline: none;
  object-fit: contain;
  cursor: pointer;
  margin-right: 12px;
`;

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    password: "",
  });

  const [dialog, setDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(
    "이용하시려는 서비스는 로그인이 필요해요"
  );

  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { logInError } = useSelector((state) => state.user.state);

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!loginInfo.loginId || !loginInfo.password) {
      setDialog(true);
      setDialogMessage("아이디와 비밀번호를 입력해주세요");
      return;
    }

    dispatch({
      type: USER_LOGIN_REQUEST,
      data: loginInfo,
    });
  };

  useEffect(() => {
    if (logInError) {
      setDialog(true);
      setDialogMessage(logInError);
    }
  }, [logInError]);

  const navigate = useNavigate();

  useEffect(() => {
    if (me?.id) {
      navigate("/stock");
    }
  }, [me, navigate]);

  return (
    <LoginPageStyle>
      <Flex align="center">
        <HambergerImg></HambergerImg>
        <SubTitle>로그인/인증방법</SubTitle>
      </Flex>
      <LabeledInput
        labelText="아이디"
        inputType="text"
        label="아이디"
        name="loginId"
        onChange={onChange}
      />
      <LabeledInput
        labelText="비밀번호"
        inputType="password"
        label="비밀번호"
        name="password"
        onChange={onChange}
      />
      <Button fullWidth size="large" onClick={onSubmit}>
        로그인
      </Button>

      <Flex justify="flex-end">
        <SubContentLink to="/signup">회원가입</SubContentLink>
        <SubContentLink to="/signup">/ 아이디</SubContentLink>
        <SubContentLink to="/signup">/ 비밀번호 찾기</SubContentLink>
      </Flex>

      <Dialog
        onConfirm={() => {
          setDialog(false);
        }}
        onCancel={() => {
          setDialog(false);
        }}
        onlyConfirm
        visible={dialog}
        title="확인이 필요해요 😰"
        onClickBackground={() => {
          setDialog(false);
        }}
      >
        {dialogMessage}
      </Dialog>
    </LoginPageStyle>
  );
};

export default Login;
