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
import { registerUser } from "../../_actions/user_action";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [Validate, setValidate] = React.useState(false);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Compare, setCompare] = React.useState("");
  const [Nickname, setNickname] = React.useState("");

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
      if (Password !== Compare) {
        return alert("비밀번호가 일치하지 않습니다.");
      }

      let body = {
        email: Email,
        password: Password,
        nickname: Nickname,
      };

      dispatch(registerUser(body)).then((response) => {
        if (response.payload.success) {
          console.log("regist success");
          alert("회원가입 성공! 로그인 해주세요!");
        } else {
          console.log("regist Fail", response.payload);
          alert("회원가입 실패");
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
        회원가입
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Regist</DialogTitle>
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
            error={Password.length !== 0 && Password.length < 4}
            helperText={
              Password.length !== 0 && Password.length < 4
                ? "4글자 이상 입력해주세요"
                : ""
            }
            type="password"
            variant="standard"
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            id="comparePassword"
            error={Compare.length !== 0 && Compare !== Password}
            helperText={
              Compare.length !== 0 && Compare !== Password
                ? "비밀번호를 확인해주세요"
                : ""
            }
            label="Compare Password"
            type="password"
            variant="standard"
            onChange={(event) => setCompare(event.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            id="Nickname"
            label="Nickname"
            error={Nickname.length !== 0 && Nickname.length < 2}
            helperText={
              Nickname.length !== 0 && Nickname.length < 2
                ? "2글자 이상의 닉네임을 작성해주세요"
                : "2글자 이상의 닉네임을 작성해주세요"
            }
            type="text"
            variant="standard"
            onChange={(event) => setNickname(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSubmit}>회원가입</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

{
  /*
   */
}
