import React from "react";
import Typography from "@mui/material/Typography";
import MyRoutine from "../../utils/MyRoutine";
import SettingPage from "../../SettingPage/SettingPage";
import { Stack } from "@mui/material";

function RoutinePage(props) {
  return (
    <Stack>
      <Typography variant="h5">RoutinePage</Typography>
      <SettingPage state="C" />
      <Stack alignItems="center">
        <MyRoutine swipe={props.swipe} />
      </Stack>
    </Stack>
  );
}

export default RoutinePage;
