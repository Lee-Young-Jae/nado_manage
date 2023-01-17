import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "../common/Dialog";

/**
 * 로그인 여부를 파악하여 로그인이 되어 있지 않으면 main 페이지로 이동시키는 컴포넌트
 */
const IsLogin = () => {
  const { me } = useSelector((state) => state.user);

  const [dialog, setDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("이용하시려는 서비스는 로그인이 필요해요");
  const onConfirm = () => {
    setDialog(false);
    navigate("/login");
  };

  const onCancel = () => {
    setDialog(false);
    navigate("/login");
  };

  const navigate = useNavigate();
  useEffect(() => {
    console.log(me);
    if (!me?.id) {
      setDialog(true);
    }
  }, [me, navigate]);

  return (
    <>
      <Dialog
        onlyConfirm
        title="로그인 해주세요 😰"
        visible={dialog}
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        {dialogMessage}
      </Dialog>
    </>
  );
};

export default IsLogin;
