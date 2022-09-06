import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

function NavBar(props) {
  const [value, setValue] = React.useState(props.page);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: "100%" }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="메인페이지"
        value="LandingPage"
        href="/"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="내 루틴"
        value="RoutinePage"
        href="/routine"
        icon={<FitnessCenterIcon />}
      />
      <BottomNavigationAction
        label="내 운동기록"
        value="CalendarPage"
        href="/calendar"
        icon={<CalendarMonthIcon />}
      />
    </BottomNavigation>
  );
}

export default React.memo(NavBar);
