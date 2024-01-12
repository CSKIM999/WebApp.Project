import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { logoutUser } from "../../../../_actions/user_action";

const PC = ["Win", "Mac", "Lin"];
const userData = window.navigator.platform.slice(0, 3);
const platform = PC.indexOf(userData) >= 0 ? "PC" : "MOBILE";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  const token =
    user.loginSuccess && user.loginSuccess.token
      ? user.loginSuccess.token
      : false;
  const isNative = platform === "PC" ? false : token;
  const logoutFunction = () => {
    dispatch(logoutUser(isNative)).then((response) => {
      if (response.payload.success) {
        navigate("/");
      } else {
        alert("로그아웃 실패");
        console.log(response);
      }
    });
  };
  const onClickHandler = () => {
    logoutFunction();
  };
  return (
    <Stack direction="row" alignItems="center" onClick={onClickHandler}>
      <Typography variant="button">LOGOUT</Typography>
      <LogoutOutlined color="error" sx={{ pl: 1 }} />
    </Stack>
  );
}
