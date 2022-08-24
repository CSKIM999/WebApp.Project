import * as React from "react";
import * as Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRoutine } from "../../_actions/routine_action";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box, Fab, ListItemText } from "@material-ui/core";
import Stopwatch from "./Sections/Stopwatch";
import ProgressCard from "./Sections/ProgressCard";

// todo ...
// stopwatch
// count toggle <= Stepper - Progress

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function WorkoutPage(props) {
  const myRoutine = useSelector((state) => state.routine.myRoutines).filter(
    (x) => x._id === props.id
  )[0];
  const id = props.id;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant={""} size={"small"} onClick={handleClickOpen}>
        실행
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {myRoutine.title}
              </Typography>
              <Button
                autoFocus
                color="inherit"
                onClick={() => {
                  console.log(myRoutine);
                }}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem>
              <Stopwatch />
            </ListItem>
            <ListItem>
              <ProgressCard routine={myRoutine.detail} />
            </ListItem>
          </List>
        </Box>
      </Dialog>
    </div>
  );
}
