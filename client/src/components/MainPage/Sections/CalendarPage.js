import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { CalendarPickerSkeleton } from "@mui/x-date-pickers/CalendarPickerSkeleton";
import Badge from "@mui/material/Badge";
import { Button, Grid } from "@material-ui/core";
import { getHistory } from "../../../_actions/history_action";
import AdjustHistory from "./CalendarUtils/AdjustHistory";
import HistoryCard from "./CalendarUtils/HistoryCard";
import { DatePicker } from "@mui/x-date-pickers";

const initialValue = new Date();

export default function StaticDatePickerDemo() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [value, setValue] = React.useState(initialValue);
  const Record = useSelector((state) => state.history.myDocs);

  const testFunction = (date) => {};
  function fakeFetch(date, { signal }) {
    const pivot = date;
    const yyyy = pivot.getFullYear();
    const mm = pivot.getMonth() + 1;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        try {
          const daysToHighlight = Record.filter(
            (x) => x.year === yyyy && x.month === mm
          ).map((item, index) => {
            return item.day;
          });
          resolve({ daysToHighlight });
        } catch (err) {}
      }, 500);

      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException("aborted", "AbortError"));
      };
    });
  }
  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          throw error;
        }
      });
    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // return requestAbortController.current?.abort();
  }, [Record]);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container direction="column">
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* <DatePicker
            https://codesandbox.io/s/material-ui-date-picker-forked-k8v5e?fontsize=14&hidenavigation=1&theme=dark&file=/demo.js
            확인해보기
            */}
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={value}
              loading={isLoading}
              onChange={(newValue) => {
                testFunction(newValue);
                setValue(newValue);
              }}
              onMonthChange={handleMonthChange}
              renderInput={(params) => <TextField size="small" {...params} />}
              renderLoading={() => <CalendarPickerSkeleton />}
              renderDay={(day, _value, DayComponentProps) => {
                const isSelected =
                  !DayComponentProps.outsideCurrentMonth &&
                  highlightedDays.indexOf(day.getDate()) >= 0;

                return (
                  <Badge
                    key={day.toString()}
                    overlap="circular"
                    style={{ cursor: "default" }}
                    badgeContent={isSelected ? "💦" : undefined}
                  >
                    <PickersDay {...DayComponentProps} />
                  </Badge>
                );
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <AdjustHistory date={value} />
        </Grid>
        <Grid item>
          <HistoryCard value={value} />
        </Grid>
      </Grid>
    </Box>
  );
}
