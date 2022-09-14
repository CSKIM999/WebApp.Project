/* eslint-disable no-lone-blocks */
import * as React from "react";
import * as Axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import isEmail from "validator/lib/isEmail";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import { LoginOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [Validate, setValidate] = React.useState(false);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");

  const IsValid = (str) => {
    if (isEmail(str)) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  };
  const handleKeydown = (key) => {
    if (key === "Enter") {
      handleSubmit();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    IsValid(Email);
    if (isEmail(Email)) {
      // 올바른 이메일 입력
      let body = {
        email: Email,
        password: Password,
      };

      dispatch(loginUser(body)).then((response) => {
        if (response.payload.loginSuccess) {
          alert("로그인 성공!");
          if (Email === "test@te.st") {
            // only for test_ID
            const body = {
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
            Axios.post(process.env.REACT_APP_HOST + "/api/history/", body).then(
              (response) => {
                if (response.data.success) {
                } else {
                  console.log("test history Save Fail");
                }
              }
            );
          }
          navigate("/front");
        } else {
          alert("로그인 실패");
        }
      });
    } else {
      // 올바르지 않은 이메일 입력
      return alert("이메일 양식이 올바르지 않습니다");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        로그인
        <LoginOutlined sx={{ ml: 1 }} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="primary">
          <Stack alignItems="center" direction="row">
            로그인 <LoginOutlined sx={{ ml: 1 }} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              autoFocus
              id="name"
              label="Email Address"
              error={Validate}
              helperText={!Validate ? "" : "올바른 이메일을 입력해주세요"}
              type="email"
              variant="standard"
              onChange={(event) => setEmail(event.target.value)}
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              onKeyDown={(event) => handleKeydown(event.key)}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSubmit}>로그인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
