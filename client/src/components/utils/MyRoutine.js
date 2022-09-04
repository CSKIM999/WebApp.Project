import * as React from "react";
import * as Axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import { Box, Button, Collapse, CardActionArea, Grid } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import SettingPage from "../SettingPage/SettingPage";
import { getRoutine } from "../../_actions/routine_action";
import WorkoutPage from "../WorkoutPage/WorkoutPage";

import { Delete } from "@mui/icons-material";
import { Stack } from "@mui/material";

export default function MyRoutine(props) {
  const [expanded, setExpanded] = React.useState("false");
  const myRoutine = useSelector((state) => state.routine.myRoutines);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleExpandClick = (panel) => {
    if (expanded !== panel) {
      setExpanded(panel);
    } else {
      setExpanded("false");
    }
  };

  const handleDelete = (data) => {
    Axios.post("/api/routine/remove", { _id: data }).then((response) => {
      if (response.data.success) {
        dispatch(getRoutine({ writer: user.userData._id }));
      }
    });
  };

  return (
    <Stack>
      {myRoutine &&
        myRoutine.map((item, index) => (
          <Card
            key={index}
            variant={"outlined"}
            sx={{
              minWidth: 275,
              my: 1,
              borderRadius: "0.5rem",
              maxWidth: 500,
              width: "80vw",
            }}
          >
            <CardActionArea
              expanded={expanded === `panel${index + 1}` ? "true" : undefined}
              onClick={() => handleExpandClick(`panel${index + 1}`)}
              aria-expanded={expanded}
            >
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                >
                  <Grid item>
                    <Typography variant="h5" component="div">
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="text.secondary">
                      {item.detail.length} Workouts
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Collapse
                in={expanded === `panel${index + 1}` ? true : undefined}
                timeout="auto"
                unmountOnExit
              >
                <CardContent sx={{ color: "text.secondary" }}>
                  {item.detail.map((workout, index) => (
                    <Grid direction="row" container key={`workout${index}`}>
                      <Grid item xs={9}>
                        <Typography>{workout.name}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography>{workout.contents.length} SET</Typography>
                      </Grid>
                    </Grid>
                  ))}
                </CardContent>
              </Collapse>
            </CardActionArea>
            <Grid container justifyContent="space-evenly" direction="row">
              <Grid item p={2}>
                <Button
                  onClick={() => handleDelete(item)}
                  variant={"text"}
                  size="small"
                >
                  삭제
                  <Delete fontSize="small" />
                </Button>
              </Grid>
              <Grid item p={2}>
                <SettingPage data={item} />
              </Grid>
              <Grid item p={2}>
                <WorkoutPage swipe={props.swipe} id={item._id} />
              </Grid>
            </Grid>
          </Card>
        ))}
    </Stack>
  );
}
