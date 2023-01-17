import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Components/common/Button";
import Dialog from "../Components/common/Dialog";
import LabeledInput from "../Components/Patterns/LabeledInput";
import { USER_SIGNUP_REQUEST } from "../modules/reducers/user";

const SignUpPage = () => {
  const [signupInfo, setSignupInfo] = useState({
    signupId: "",
    password: "",
    passwordConfirm: "",
  });

  const [dialog, setDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = {
    title: "회원가입 실패",
    content: "회원가입에 실패했습니다.",
  };

  const dispatch = useDispatch();

  const { signUpError, signUpDone } = useSelector((state) => state.user.state);
  const { me } = useSelector((state) => state.user);

  const onChangeSignup = (e) => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  const onSubmitSignup = (e) => {
    e.preventDefault();
    console.log(signupInfo);
    dispatch({
      type: USER_SIGNUP_REQUEST,
      data: {
        loginId: signupInfo.signupId,
        password: signupInfo.password,
      },
    });
  };

  const navigate = useNavigate();
  useState(() => {
    if (signUpError) {
      setDialog(true);
      setDialogMessage({ ...dialogMessage, content: signUpError });
    }

    if (signUpDone) {
      setDialog(true);
      setDialogMessage({
        title: "회원가입 성공✨",
        content: "회원가입에 성공했습니다.",
      });
    }

    if (me?.id) {
      navigate("/stock");
    }
  }, [signUpError, signUpDone]);

  return (
    <>
      <h1>간단 회원가입</h1>
      <LabeledInput
        labelText="아이디"
        inputType="text"
        label="아이디"
        name="signupId"
        onChange={onChangeSignup}
      />
      <LabeledInput
        labelText="비밀번호"
        inputType="password"
        label="비밀번호"
        name="password"
        onChange={onChangeSignup}
      />
      <LabeledInput
        labelText="비밀번호 확인"
        inputType="password"
        label="비밀번호확인"
        name="passwordConfirm"
        onChange={onChangeSignup}
      />
      <Button onClick={onSubmitSignup}>회원가입</Button>
      <Dialog visible={dialog} title={dialogMessage.title}>
        {dialogMessage.content}
      </Dialog>
    </>
  );
};

export default SignUpPage;
