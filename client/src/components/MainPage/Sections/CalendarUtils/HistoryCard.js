import * as React from "react";
import * as Axios from "axios";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Collapse,
  CardActionArea,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import { getHistory } from "../../../../_actions/history_action";
import AdjustHistory from "./AdjustHistory";

export default function HistoryCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const Record = useSelector((state) => state.history.myDocs);
  const [Rendervalue, setRendervalue] = React.useState([]);
  const user = useSelector((state) => state.user);
  React.useEffect(() => {
    const yyyy = props.value.getFullYear();
    const mm = props.value.getMonth() + 1;
    const dd = props.value.getDate();
    setRendervalue(
      Record &&
        Record.filter((x) => x.year === yyyy && x.month === mm && x.day === dd)
    );
  }, [props]);

  const handleExpandClick = (panel) => {
    if (expanded !== panel) {
      setExpanded(panel);
    } else {
      setExpanded("false");
    }
  };
  const handleTimeUnit = (arr) => {
    var unit = "";
    if (arr[0]) {
      unit = `${arr[0]} 시간 ${arr[1]} 분`;
    } else if (arr[1]) {
      unit = `${arr[1]} 분 ${arr[2]} 초`;
    } else {
      unit = `${arr[2]} 초`;
    }
    return (
      <Typography variant="h6" component="div">
        {unit}
      </Typography>
    );
  };

  const handleDelete = (Contentid) => {
    Axios.post("/api/history/remove", { _id: Contentid }).then((response) => {
      if (response.data.success) {
        dispatch(getHistory({ writer: user.userData._id }));
        console.log("done check the redux state");
      }
    });
  };

  return (
    <div>
      {Rendervalue &&
        Rendervalue.map((item, index) => (
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
                  <Typography variant="h6" component="div">
                    {handleTimeUnit(item.runtime)}
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
                {item.execute.map((workout, workoutIndex) => (
                  <Grid
                    container
                    direction="row"
                    key={`workout${workoutIndex}`}
                  >
                    <Typography>{workout.name}</Typography>
                    <Typography>
                      {workout.progress[0]} / {workout.progress[1]} SET
                    </Typography>
                  </Grid>
                ))}
              </CardContent>
              <Grid container direction="row" spacing={2}>
                <Button onClick={() => handleDelete(item._id)} size="small">
                  삭제
                </Button>
                {/* adj 하는경우 props 에 넣어주기 */}
                <AdjustHistory date={props.value} data={item} />
                <Button onClick={() => console.log(item)} size="small">
                  test
                </Button>
              </Grid>
            </Collapse>
          </Card>
        ))}
    </div>
  );
}
