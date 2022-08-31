import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import Settingpage from "../../SettingPage/SettingPage";
import MyRoutine from "../../utils/MyRoutine";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";
import Logout from "../../utils/Logout";

function HomePage(props) {
  const myRoutine = useSelector((state) => state.routine.myRoutines);
  const useHelper = () => {
    if (myRoutine && myRoutine.length === 0) {
      return <Settingpage state="C" />;
    } else {
      return (
        <Typography variant="button" gutterBottom>
          내 루틴 빠른 시작
        </Typography>
      );
    }
  };
  return (
    <Grid container direction="column">
      <Grid item>
        {useHelper()}
        <Logout />
      </Grid>
      <Grid item>
        <MyRoutine swipe={props.swipe} />
      </Grid>
    </Grid>
  );
}

export default HomePage;
