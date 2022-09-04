import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { Button, Grid } from "@material-ui/core";
import { Calendar } from "react-calendar";
import "../../../../App.css";

export default function CalendarParts() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [value, setValue] = React.useState(new Date());
  const Record = useSelector((state) => state.history.myDocs);
  const check = (event) => {
    console.log(event);
    setValue(event);
  };
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }
  return (
    <Grid item xs={10}>
      <Calendar
        onChange={(event) => check(event)}
        onClickDay={(value, event) => createRipple(event)}
        calendarType="US"
        formatDay={(locale, date) => {
          // return <Button fullWidth>{date.getDate()}</Button>;
          return <div>date</div>;
        }}
        minDetail="year"
        // navigationLabel={() => <p>Choose Date</p>}
        showNeighboringMonth={false}
        prev2Label={null}
        next2Label={null}
        value={value}
      />
    </Grid>
  );
}
