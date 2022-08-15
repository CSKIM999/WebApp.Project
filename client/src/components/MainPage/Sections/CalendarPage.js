import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { CalendarPickerSkeleton } from "@mui/x-date-pickers/CalendarPickerSkeleton";
import Badge from "@mui/material/Badge";
//calendar 의 dynamic data 활용

// fakeFetch 에서 이번달의 운동데이터를 state 에 저장하고 렌더링하게 던져주기
// ++ 날짜 클릭 시 해당 날짜에 해당하는 정보가 state 안에 있다면 밑에 렌더링 해주기
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysToHighlight = [1, 3, 5, 7, 9];
      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = new Date();

export default function StaticDatePickerDemo() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [value, setValue] = React.useState(initialValue);

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
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  // return (
  //   <LocalizationProvider dateAdapter={AdapterDateFns}>
  //     <StaticDatePicker
  //       displayStaticWrapperAs="desktop"
  //       value={value}
  //       onChange={(newValue) => {
  //         setValue(newValue);
  //       }}
  //       renderInput={(params) => <TextField {...params} />}
  //     />
  //   </LocalizationProvider>
  // );
  return (
    <Box sx={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={value}
          loading={isLoading}
          onChange={(newValue) => {
            console.log(newValue.getMonth() + 1, newValue.getDate());
            setValue(newValue);
          }}
          onMonthChange={handleMonthChange}
          renderInput={(params) => <TextField size="small" {...params} />}
          renderLoading={() => <CalendarPickerSkeleton />}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              highlightedDays.indexOf(day.getDate()) > 0;
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
    </Box>
  );
}
