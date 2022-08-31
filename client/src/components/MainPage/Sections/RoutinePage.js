import React from "react";
import Typography from "@mui/material/Typography";
import MyRoutine from "../../utils/MyRoutine";
import SettingPage from "../../SettingPage/SettingPage";

function RoutinePage(props) {
  return (
    <div>
      <Typography variant="h5">RoutinePage</Typography>
      <SettingPage state="C" />
      <MyRoutine swipe={props.swipe} />
    </div>
  );
}

export default RoutinePage;
