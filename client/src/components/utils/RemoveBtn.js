import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

function RemoveBtn(props) {
  const onClick = props ? props.event : console.log("ERROR");

  return (
    <Button
      onClick={() => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
          onClick();
        } else {
          return;
        }
      }}
      color="error"
      variant="text"
      size="small"
    >
      삭제
      <Delete color="inherit" fontSize="small" />
    </Button>
  );
}

export default RemoveBtn;
