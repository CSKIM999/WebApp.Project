import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

function RemoveBtn(props) {
  const onClick = props ? props.event : console.log("ERROR");
  return (
    <Button
      onClick={() => onClick()}
      variant={"text"}
      size="small"
      color="inherit"
    >
      삭제
      <Delete fontSize="small" />
    </Button>
  );
}

export default RemoveBtn;
