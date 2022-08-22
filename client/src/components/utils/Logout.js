import * as React from "react";
import Button from "@mui/material/Button";
import * as axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const onClickHandler = () => {
    axios.get(`/api/user/logout`).then((response) => {
      if (response.data.success) {
        navigate("/front");
      } else {
        alert("로그아웃 실패");
        console.log(response);
      }
    });
  };
  return (
    <Button variant="outlined" onClick={onClickHandler}>
      로그아웃
    </Button>
  );
}
