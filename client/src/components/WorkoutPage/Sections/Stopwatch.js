import { Button, Slide, Typography } from "@material-ui/core";
import { PlayArrow, Stop } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useRef, useState, useEffect } from "react";

export default function Stopwatch(props) {
  const timer = useRef(0);

  const [Count, setCount] = useState(0);
  const [Run, setRun] = useState(false);

  useEffect(() => {
    props.timer(realTime(true));
  }, [Count]);

  const startHandler = () => {
    if (!timer.run) {
      timer.run = setInterval(() => {
        setCount((c) => c + 1);
      }, 1000);
      setRun(true);
    }
  };

  const stopHandler = () => {
    clearInterval(timer.run);
    setRun(false);
    console.log(timer);
    timer.run = 0;
  };

  const realTime = (prop) => {
    const hour = parseInt(Count / 3600);
    const minute = parseInt((Count % 3600) / 60);
    const second = parseInt((Count % 3600) % 60);
    if (prop) {
      return [hour, minute, second];
    } else {
      return `${hour < 10 ? `0${hour}` : hour} : ${
        minute < 10 ? `0${minute}` : minute
      } : ${second < 10 ? `0${second}` : second}`;
    }
  };

  return (
    <Stack>
      <Typography variant="h4" style={!Count || Run ? {} : { color: "red" }}>
        {realTime()}
      </Typography>
      <Stack direction="row" justifyContent="center">
        <Slide direction="right" in={!Run}>
          <Button
            onClick={startHandler}
            style={{ minWidth: 0, width: 0, padding: 0 }}
          >
            Start
            <PlayArrow />
          </Button>
        </Slide>
        <Slide direction="left" in={Run}>
          <Button
            onClick={stopHandler}
            style={{ minWidth: 0, width: 0, padding: 0 }}
          >
            Stop
            <Stop />
          </Button>
        </Slide>
      </Stack>
    </Stack>
  );
}
