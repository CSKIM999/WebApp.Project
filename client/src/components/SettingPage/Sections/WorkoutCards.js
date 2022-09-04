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
        return (
          <Grid container justifyContent="center">
            <Grid item xs={10}>
              <Typography>{index + 1} SET</Typography>
            </Grid>
            <Grid item>
              <Typography>{data[0]} KG x</Typography>
            </Grid>
            <Grid item>
              <Typography>{data[1]} 개</Typography>
            </Grid>
          </Grid>
        );
        break;
      case "count":
        return (
          <Grid container justifyContent="space-between">
            <Grid item xs={4}>
              <Typography>{index + 1} SET</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{data[1]} 개</Typography>
            </Grid>
          </Grid>
        );
        break;
      case "time":
        return (
          <Grid container>
            <Grid item></Grid>
            <Grid item></Grid>
            <Typography>{index + 1} SET</Typography>
            <Typography>
              {data[1]} {item[2]}
            </Typography>
          </Grid>
        );
        break;
      default:
        break;
    }
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
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                >
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
                    <Box key={workoutIndex}>
                      {handleWorkoutData(item.option, workout, workoutIndex)}
                    </Box>
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
