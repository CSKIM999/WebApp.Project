import * as React from "react";
import * as Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRoutine } from "../../_actions/routine_action";

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
  const [TitleFlag, setTitleFlag] = React.useState(false);
  const [Title, setTitle] = React.useState(props.data ? props.data.title : "");
  const [Routine, setRoutine] = React.useState(
    props.data ? props.data.detail : []
  );
  const [IsAdjust, setIsAdjust] = React.useState(
    props.data ? props.data._id : false
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const check = () => {
    console.log(Routine, IsAdjust, props);
  };
  const reset = (Adjust) => {
    setTitleFlag(false);
    setTitle(Adjust ? Adjust.data.title : "");
    setRoutine(Adjust ? Adjust.data.detail : []);
    setIsAdjust(Adjust ? Adjust.data._id : false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    if (!IsAdjust) {
      reset();
    } else {
      reset(props);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleTitle = (newTitle) => {
    setTitle(newTitle);
  };
  const handleSetroutine = (data, adjust) => {
    if (adjust !== false) {
      // 수정
      const newRoutine = [...Routine];
      newRoutine[adjust] = data;
      setRoutine([...newRoutine]);
    } else {
      //생성
      setRoutine([...Routine, data]);
    }
  };

  const handleSave = () => {
    const dispatchRoutine = (data) => {
      dispatch(getRoutine({ writer: data.writer })).then((response) => {
        console.log("ALL success", response);
        handleClose();
      });
    };

    if (!Title) {
      setTitleFlag(true);
    }

    const body = {
      writer: user.userData._id,
      title: Title,
      detail: [...Routine],
    };
    if (IsAdjust !== false) {
      body._id = IsAdjust;
      console.log("adjust", body);
      Axios.post("/api/routine/modify", body).then((response) => {
        if (response.data.success) {
          dispatchRoutine(body);
        }
      });
    } else {
      console.log("not adjust", body);
      Axios.post("/api/routine/", body).then((response) => {
        if (response.data.success) {
          dispatchRoutine(body);
        } else {
          console.log("upload error", response.payload);
        }
      });
    }
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
              <Button autoFocus color="inherit" onClick={handleSave}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem>
              <TextField
                label="루틴 이름"
                variant="outlined"
                error={TitleFlag && Title === ""}
                helperText={
                  TitleFlag && Title === "" ? "루틴 이름을 입력해주세요" : ""
                }
                value={Title}
                onChange={(event) => handleTitle(event.target.value)}
              />
            </ListItem>
            <ListItem>
              <DetailPage adj={false} setRoutine={handleSetroutine} />
            </ListItem>
            <ListItem>
              <Button onClick={check}>check</Button>
            </ListItem>
          </List>
          <WorkoutCards
            setRoutine={handleSetroutine}
            detail={Routine}
          ></WorkoutCards>
        </Box>
      </Dialog>
    </div>
  );
}
