import * as React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import HomePage from "./Sections/HomePage";
import RoutinePage from "./Sections/RoutinePage";
import CalendarPage from "./Sections/CalendarPage";
import * as axios from "axios";
import { Button } from "@material-ui/core";

const StyledTabs = withStyles({
  indicator: {
    top: 0,
  },
})((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ sx: { height: 5 }, children: <span /> }}
  />
));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function getId(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function MainPage() {
  const [Routines, setRoutines] = React.useState([]);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    axios.post("/api/routine/routines").then((response) => {
      setRoutines(response.data.info);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <Button
        onClick={() => {
          console.log(Routines);
        }}
      >
        test
      </Button>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <HomePage />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <RoutinePage />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <CalendarPage />
        </TabPanel>
      </SwipeableViews>
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <AppBar position="static">
          <StyledTabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{ height: "4rem" }}
          >
            <Tab label="메인페이지" {...getId(0)} />
            <Tab label="내 루틴" {...getId(1)} />
            <Tab label="운동 기록" {...getId(2)} />
          </StyledTabs>
        </AppBar>
      </div>
    </Box>
  );
}
