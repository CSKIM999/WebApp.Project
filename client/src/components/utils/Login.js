/* eslint-disable no-lone-blocks */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import isEmail from "validator/lib/isEmail";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../_actions/user_action";

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
          navigate("/");
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
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>LOG-IN</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            id="password"
            label="Password"
            type="password"
            variant="standard"
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSubmit}>로그인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
