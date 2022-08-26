import React from "react";
import Typography from "@mui/material/Typography";
import MyRoutine from "../../utils/MyRoutine";

function RoutinePage(props) {
  return (
    <div>
      <Typography variant="h5">RoutinePage</Typography>
      <MyRoutine swipe={props.swipe} />
    </div>
  );
}

export default RoutinePage;
