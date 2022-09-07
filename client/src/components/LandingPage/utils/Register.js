/* eslint-disable no-lone-blocks */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import isEmail from "validator/lib/isEmail";

import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { PersonAdd } from "@mui/icons-material";
import { Stack } from "@mui/material";

export default function Register() {
  const dispatch = useDispatch();
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
          alert("회원가입 성공! 로그인 해주세요!");
          handleClose();
        } else {
          alert("회원가입 실패");
        }
      });
    } else {
      return alert("이메일 양식이 올바르지 않습니다");
    }
  };

  return (
    <div>
      <Button color="secondary" variant="outlined" onClick={handleClickOpen}>
        회원가입
        <PersonAdd sx={{ ml: 1 }} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="secondary">
          <Stack alignItems="center" direction="row">
            회원가입 <PersonAdd sx={{ ml: 1.5 }} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={4} direction="column">
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

            <TextField
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

            <TextField
              id="Nickname"
              label="Nickname"
              error={Nickname.length !== 0 && Nickname.length < 2}
              helperText={
                Nickname.length !== 0 && Nickname.length < 2
                  ? "2글자 이상의 닉네임을 작성해주세요"
                  : "2글자 이상의 닉네임을 작성해주세요"
              }
              type="text"
              onKeyDown={(event) => handleKeydown(event.key)}
              variant="standard"
              onChange={(event) => setNickname(event.target.value)}
            />
          </Stack>
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
