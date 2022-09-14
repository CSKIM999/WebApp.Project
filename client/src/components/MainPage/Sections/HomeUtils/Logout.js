import * as React from "react";
import * as axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

export default function Logout() {
  const navigate = useNavigate();

  const onClickHandler = () => {
    axios
      .get(process.env.REACT_APP_HOST + `/api/user/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          navigate("/");
        } else {
          alert("로그아웃 실패");
          console.log(response);
        }
      });
  };
  return (
    <Stack direction="row" alignItems="center" onClick={onClickHandler}>
      <Typography variant="button">LOGOUT</Typography>
      <LogoutOutlined color="error" sx={{ pl: 1 }} />
    </Stack>
  );
}
