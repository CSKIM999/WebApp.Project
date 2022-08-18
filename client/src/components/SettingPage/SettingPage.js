import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box, Fab, ListItemText } from "@material-ui/core";

import DetailPage from "../DetailPage/DetailPage";
import WorkoutCards from "./Sections/WorkoutCards";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingPage(props) {
  const [open, setOpen] = React.useState(false);
  const [Routine, setRoutine] = React.useState(props.data ? props.data : []);
  const IsAdjust = props.data ? true : false;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const check = () => {
    console.log(Routine, IsAdjust);
  };

  return (
    <div>
      <Button
        variant={props.state === "C" ? "outlined" : ""}
        size={props.state === "C" ? "" : "small"}
        onClick={handleClickOpen}
      >
        {props.state === "C" ? "루틴추가" : "수정"}
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
                루틴 상세
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem>
              <TextField label="입력해주세요" variant="outlined" />
            </ListItem>
            <ListItem>
              <DetailPage data={Routine} setRoutine={setRoutine} />
            </ListItem>
            <ListItem>
              <Button onClick={check}>check</Button>
            </ListItem>
          </List>
          <WorkoutCards detail={Routine}></WorkoutCards>
        </Box>
      </Dialog>
    </div>
  );
}
