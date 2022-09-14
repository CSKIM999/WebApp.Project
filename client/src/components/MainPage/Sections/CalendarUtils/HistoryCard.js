import * as React from "react";
import * as Axios from "axios";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../../../_actions/history_action";
import AdjustHistory from "./AdjustHistory";
import {
  Collapse,
  Divider,
  Stack,
  CardActionArea,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import RemoveBtn from "../../../utils/RemoveBtn";

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
      <Typography variant="subtitle1" component="div">
        {unit}
      </Typography>
    );
  };

  const handleDelete = (Contentid) => {
    Axios.post(process.env.REACT_APP_HOST + "/api/history/remove", {
      _id: Contentid,
    }).then((response) => {
      if (response.data.success) {
        dispatch(getHistory({ writer: user.userData._id }));
      }
    });
  };

  return (
    <Stack direction="column" sx={{ width: "80vw", maxWidth: 500 }}>
      {Rendervalue &&
        Rendervalue.map((item, index) => (
          <Card key={index} style={{ marginBottom: 10 }} variant={"outlined"}>
            <CardActionArea
              expanded={expanded === `panel${index + 1}` ? "true" : undefined}
              onClick={() => handleExpandClick(`panel${index + 1}`)}
              aria-expanded={expanded}
            >
              <CardContent>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                >
                  <Grid item>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" component="div">
                      {handleTimeUnit(item.runtime)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Collapse
                in={expanded === `panel${index + 1}` ? true : undefined}
                timeout="auto"
                unmountOnExit
                sx={{ pb: 1 }}
              >
                <Divider textAlign="left">
                  {item.month}/{item.day}
                </Divider>
                <CardContent>
                  {item.execute.map((workout, workoutIndex) => (
                    <Grid
                      container
                      justifyContent="space-between"
                      direction="row"
                      key={`workout${workoutIndex}`}
                    >
                      <Grid item>
                        <Typography>{workout.name}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          {workout.progress[0]} / {workout.progress[1]} SET
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </CardContent>
                <Divider />
              </Collapse>
            </CardActionArea>
            <Grid
              container
              justifyContent="flex-end"
              direction="row"
              spacing={2}
            >
              <Grid item>
                <RemoveBtn event={() => handleDelete(item._id)} />
              </Grid>
              <Grid item>
                <AdjustHistory date={props.value} data={item} adj={true} />
              </Grid>
            </Grid>
          </Card>
        ))}
    </Stack>
  );
}
