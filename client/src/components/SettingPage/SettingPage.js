import * as React from "react";
import * as Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRoutine } from "../../_actions/routine_action";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box, Fab, Grid, ListItemText, Snackbar } from "@material-ui/core";

import { Build, Add, Save } from "@mui/icons-material";

import DetailPage from "../DetailPage/DetailPage";
import WorkoutCards from "./Sections/WorkoutCards";
import { Alert } from "@mui/material";
import { Stack } from "@mui/system";

const AppbarMargin = "4rem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingPage(props) {
  const [open, setOpen] = React.useState(false);
  const [SnackOpen, setSnackOpen] = React.useState({
    alertOpen: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, alertOpen } = SnackOpen;
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

  const reset = (Adjust) => {
    setTitleFlag(false);
    setTitle(Adjust ? Adjust.data.title : "");
    setRoutine(Adjust ? Adjust.data.detail : []);
    setIsAdjust(Adjust ? Adjust.data._id : false);
  };

  const handleSnackClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen({ ...SnackOpen, alertOpen: false });
  };
  const handleClickOpen = () => {
    setOpen(true);
    if (!IsAdjust) {
      reset();
    } else {
      reset(props);
    }
  };
  const handleClose = (check) => {
    if (check) {
    }
    setOpen(false);
  };
  const handleTitle = (newTitle) => {
    setTitle(newTitle);
  };
  const handleSetroutine = (data, adjust) => {
    if (adjust !== false) {
      // 수정
      const newRoutine = [...Routine];
      if (adjust === null) {
        newRoutine.splice(data, 1);
      } else {
        newRoutine[adjust] = data;
      }
      setRoutine([...newRoutine]);
    } else {
      //생성
      setRoutine([...Routine, data]);
    }
  };

  const handleSave = () => {
    !Title ? setTitleFlag(true) : setTitleFlag(false);
    if (Title.length === 0 || Routine.length === 0) {
      setSnackOpen({ alertOpen: true, vertical: "top", horizontal: "center" });
      return;
    }
    const body = {
      writer: user.userData._id,
      title: Title,
      detail: [...Routine],
    };
    const dispatchRoutine = (data) => {
      dispatch(getRoutine({ writer: data.writer })).then((response) => {
        handleClose();
      });
    };
    if (IsAdjust !== false) {
      body._id = IsAdjust;
      Axios.post("/api/routine/modify", body).then((response) => {
        if (response.data.success) {
          dispatchRoutine(body);
        }
      });
    } else {
      Axios.post("/api/routine/", body).then((response) => {
        if (response.data.success) {
          dispatchRoutine(body);
        } else {
        }
      });
    }
  };

  return (
    <div>
      <Button
        variant={props.state === "C" ? "outlined" : "text"}
        size={props.state === "C" ? "" : "small"}
        onClick={handleClickOpen}
      >
        {props.state === "C" ? "루틴추가" : "수정"}
        {props.state === "C" ? <Add /> : <Build fontSize="small" />}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box>
          <AppBar
            sx={{
              position: "stick",
              height: AppbarMargin,
              justifyContent: "center",
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => handleClose(true)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                루틴 {props.state ? "생성" : "수정"}
              </Typography>
              <Button autoFocus color="inherit" onClick={handleSave}>
                <Save fontSize="small" />
                SAVE
              </Button>
              <Snackbar
                open={alertOpen}
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={3000}
                onClose={handleSnackClose}
                key={vertical + horizontal}
              >
                <Alert severity="error">루틴 정보를 다시 확인해주세요</Alert>
              </Snackbar>
            </Toolbar>
          </AppBar>
          <Stack sx={{ p: 2, mt: AppbarMargin }} spacing={2}>
            <TextField
              label="루틴 이름"
              variant="outlined"
              error={TitleFlag && Title === ""}
              helperText={
                TitleFlag && Title === "" ? "루틴 이름을 입력해주세요" : ""
              }
              value={Title}
              onChange={(event) => handleTitle(event.target.value)}
              sx={{ width: "60%", mt: 2 }}
            />
            <DetailPage adj={false} setRoutine={handleSetroutine} />
            <WorkoutCards setRoutine={handleSetroutine} detail={Routine} />
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
}
