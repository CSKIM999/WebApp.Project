import { Box, Button, Typography } from "@material-ui/core";
import { useRef, useState } from "react";

export default function Stopwatch() {
  const timer = useRef(0);

  const [Count, setCount] = useState(0);
  const [Run, setRun] = useState(false);

  const startHandler = () => {
    if (!timer.run) {
      timer.run = setInterval(() => setCount((c) => c + 1), 1000);
      setRun(false);
    }
  };

  const stopHandler = () => {
    clearInterval(timer.run);
    setRun(true);
    console.log(timer);
    timer.run = 0;
  };

  return (
    <Box>
      <Typography variant="h4" style={Run ? { color: "red" } : {}}>
        Timer: {Count}{" "}
      </Typography>
      <Button onClick={startHandler}>Start</Button>
      <Button onClick={stopHandler}>Stop</Button>
    </Box>
  );
}
