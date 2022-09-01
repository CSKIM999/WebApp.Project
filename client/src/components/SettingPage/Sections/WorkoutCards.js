import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Collapse,
  CardActionArea,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import DetailPage from "../../DetailPage/DetailPage";
import { Stack } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function WorkoutCards(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = (panel) => {
    if (expanded !== panel) {
      setExpanded(panel);
    } else {
      setExpanded("false");
    }
  };
  const handleWorkoutData = (item, data, index) => {
    var body;
    switch (item[0]) {
      case "weight":
        body = (
          <React.Fragment>
            <Typography>{index + 1} SET</Typography>
            <Typography>{data[0]} KG x</Typography>
            <Typography>{data[1]} 개</Typography>
          </React.Fragment>
        );
        break;
      case "count":
        body = (
          <React.Fragment>
            <Typography>{index + 1} SET</Typography>
            <Typography>{data[1]} 개</Typography>
          </React.Fragment>
        );
        break;
      case "time":
        body = (
          <React.Fragment>
            <Typography>{index + 1} SET</Typography>
            <Typography>
              {data[1]} {item[2]}
            </Typography>
          </React.Fragment>
        );
        break;
      default:
        break;
    }
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        {body}
      </Stack>
    );
  };
  return (
    <Stack spacing={1}>
      {props.detail &&
        props.detail.map((item, index) => (
          <Card key={index}>
            <CardActionArea
              expanded={expanded === `panel${index + 1}` ? "true" : undefined}
              onClick={() => handleExpandClick(`panel${index + 1}`)}
              aria-expanded={expanded}
            >
              <CardContent>
                <Grid container justifyContent="space-between" direction="row">
                  <Grid item>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="text.secondary">
                      {item.contents.length} Workouts
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Collapse
                in={expanded === `panel${index + 1}` ? true : undefined}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  {item.contents.map((workout, workoutIndex) => (
                    <Stack
                      key={workoutIndex}
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      {handleWorkoutData(item.option, workout, workoutIndex)}
                    </Stack>
                  ))}
                </CardContent>
              </Collapse>
            </CardActionArea>
            <Grid container justifyContent="flex-end" direction="row">
              <Button
                onClick={() => props.setRoutine(index, null)}
                size="small"
              >
                삭제
                <Delete fontSize="small" />
              </Button>
              <DetailPage
                adj={index}
                data={item}
                setRoutine={props.setRoutine}
              />
            </Grid>
          </Card>
        ))}
    </Stack>
  );
}
