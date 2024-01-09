import React from "react";
import Typography from "@mui/material/Typography";
import MyRoutine from "../../utils/MyRoutine";
import SettingPage from "../../SettingPage/SettingPage";
import { Stack } from "@mui/material";

function RoutinePage(props) {
  const STACK_STYLE = {
    width: "90%",
  };
  return (
    <Stack direction="column" alignItems="center">
      <Stack sx={STACK_STYLE}>
        <Typography variant="h5">RoutinePage</Typography>
        <Typography variant="overline">
          루틴 추가 및 수정을 위한 페이지입니다
        </Typography>
        <SettingPage state="C" />
      </Stack>
      <Stack sx={STACK_STYLE} alignItems="center">
        <MyRoutine swipe={props.swipe} />
      </Stack>
    </Stack>
  );
}

export default RoutinePage;
