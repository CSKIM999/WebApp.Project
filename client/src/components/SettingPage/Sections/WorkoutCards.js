import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Collapse,
  CardActionArea,
  CardActions,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import DetailPage from "../../DetailPage/DetailPage";

export default function WorkoutCards(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = (panel) => {
    if (expanded !== panel) {
      setExpanded(panel);
    } else {
      setExpanded("false");
    }
  };
  return (
    <div>
      {props.detail &&
        props.detail.map((item, index) => (
          <Card key={index}>
            <CardActionArea
              expanded={expanded === `panel${index + 1}` ? "true" : undefined}
              onClick={() => handleExpandClick(`panel${index + 1}`)}
              aria-expanded={expanded}
            >
              <CardContent>
                <Grid container direction="row">
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {item.contents.length} Workouts
                  </Typography>
                </Grid>
              </CardContent>
            </CardActionArea>
            <Collapse
              in={expanded === `panel${index + 1}` ? true : undefined}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                {item.contents.map((workout, workoutIndex) => (
                  <Grid
                    container
                    direction="row"
                    key={`workout${workoutIndex}`}
                  >
                    <Typography>{workoutIndex + 1} SET</Typography>
                    <Typography>{workout[0]}</Typography>
                    <Typography>{workout[1]}</Typography>
                  </Grid>
                ))}
              </CardContent>
              <Grid container direction="row" spacing={2}>
                <Button size="small">삭제</Button>
                {/* <Button onClick={() => console.log(item)} size="small">
                  수정
                </Button> */}
                <DetailPage
                  adj={index}
                  data={item}
                  setRoutine={props.setRoutine}
                />
                {/* 여기 DetailPage 들어가야함 */}
              </Grid>
            </Collapse>
          </Card>
        ))}
    </div>
  );
}
