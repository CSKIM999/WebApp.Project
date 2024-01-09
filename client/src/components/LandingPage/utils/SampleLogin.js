import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import * as Axios from "axios";
import { useNavigate } from "react-router-dom";

function SampleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickLogin = () => {
    const body = {
      email: "test@te.st",
      password: "1234",
    };
    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        const sampleRoutine = {
          writer: "631f4b63d7d78af1e32e571a",
          date: new Date(),
          name: "클릭해보세요!",
          runtime: [1, 30, 0],
          execute: [
            {
              name: "샘플 기록입니다",
              progress: [1, 1],
            },
            {
              name: "운동을 끝내면",
              progress: [1, 1],
            },
            {
              name: "기록이 자동저장됩니다.",
              progress: [1, 1],
            },
          ],
        };
        Axios.post(
          process.env.REACT_APP_HOST + "/api/history/",
          sampleRoutine
        ).then((response) => {
          console.log(response.data);
        });
        alert("로그인 성공!");
        navigate("/home");
      } else {
        alert("로그인 실패");
      }
    });
  };
  return (
    <Button
      variant="outlined"
      color="inherit"
      size="small"
      onClick={onClickLogin}
    >
      샘플아이디 로그인
    </Button>
  );
}

export default SampleLogin;
