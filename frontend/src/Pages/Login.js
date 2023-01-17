import React, { useEffect, useState } from "react";
import LabeledInput from "../Components/Patterns/LabeledInput";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN_REQUEST } from "../modules/reducers/user";
import Button from "../Components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "../Components/common/Dialog";

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
    <div>
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
      <Button size="large" onClick={onSubmit}>
        로그인
      </Button>

      <Link to="/signup">
        <Button size="large">회원가입</Button>
      </Link>

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
    </div>
  );
};

export default Login;
