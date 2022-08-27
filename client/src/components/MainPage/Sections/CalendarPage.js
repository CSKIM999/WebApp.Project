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
import { Button } from "@material-ui/core";
import { getHistory } from "../../../_actions/history_action";
import HistoryCard from "../../utils/HistoryCard";

//calendar 의 dynamic data 활용

// fakeFetch 에서 이번달의 운동데이터를 state 에 저장하고 렌더링하게 던져주기
// ++ 날짜 클릭 시 해당 날짜에 해당하는 정보가 state 안에 있다면 밑에 렌더링 해주기

const initialValue = new Date();

export default function StaticDatePickerDemo() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [value, setValue] = React.useState(initialValue);
  const [Rendervalue, setRendervalue] = React.useState([]);
  const [Record, setRecord] = React.useState(
    useSelector((state) => state.history.myDocs)
  );

  const testFunction = (date) => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    setRendervalue(
      Record.filter((x) => x.year === yyyy && x.month === mm && x.day === dd)
    );
  };
  function fakeFetch(date, { signal }) {
    const pivot = date;
    const yyyy = pivot.getFullYear();
    const mm = pivot.getMonth() + 1;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysToHighlight = Record.filter(
          (x) => x.year === yyyy && x.month === mm
        ).map((item, index) => {
          return item.day;
        });

        resolve({ daysToHighlight });
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
    console.log("EFFECTED");
    fetchHighlightedDays(initialValue);
    // return requestAbortController.current?.abort();
  }, []);

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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                badgeContent={isSelected ? "💦" : undefined}
              >
                <PickersDay {...DayComponentProps} />
              </Badge>
            );
          }}
        />
      </LocalizationProvider>
      <HistoryCard data={Rendervalue} />
    </Box>
  );
}
