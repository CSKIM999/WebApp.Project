import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Box,
  Container,
  Fab,
  Grid,
  InputAdornment,
  DialogTitle,
  Menu,
  MenuItem,
  GridList,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { Alert, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Stack } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function AdjustHistory(props) {
  const myRoutines = useSelector((state) => state.routine.myRoutines);
  const userId = useSelector((state) => state.user.useData);
  const [open, setOpen] = React.useState(false);
  const [Hour, setHour] = React.useState(0);
  const [Minute, setMinute] = React.useState(0);
  const [Second, setSecond] = React.useState(0);
  const [Title, setTitle] = React.useState("");
  const [Detail, setDetail] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const reset = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setTitle("");
    setDetail([0, 0]);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    if (!props.data) {
      reset();
    } else {
      setHour(props.data.runtime[0]);
      setMinute(props.data.runtime[1]);
      setSecond(props.data.runtime[2]);
      setTitle(props.data.name);
      setDetail(props.data.execute);
    }
  };

  const ButtonType = () => {
    if (!props.data) {
      return (
        <Fab variant="extended" onClick={handleClickOpen}>
          루틴 추가
          <AddIcon />
        </Fab>
      );
    } else {
      return (
        <Button onClick={handleClickOpen} size="small">
          수정
        </Button>
      );
    }
  };
  const timeGrid = (props) => {
    // 세트별 onchange 를 위한 state 디자인 ++ 함수 디자인 필요
    return (
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <TextField
            type={"number"}
            onChange={setHour}
            value={Hour}
            label={"시"}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField type={"number"} value={Minute} label={"분"} />
        </Grid>
        <Grid item xs={2}>
          <TextField type={"number"} value={Second} label={"초"} />
        </Grid>
      </Grid>
    );
  };
  const gridElement = (props, index) => {
    var temporary = [0, 0];
    if (props) {
      temporary = props.progress.split("/");
      console.log(props, temporary);
    }
    return (
      <Grid key={index ? index : 0} item container direction="row">
        <Grid>
          <TextField value={props ? props.name : ""} label="운동 이름" />
        </Grid>
        <Grid>
          <TextField
            InputProps={{ inputProps: { min: 0, max: 20 } }}
            type={"number"}
            label="수행 세트"
            value={temporary[0] * 1}
          />
        </Grid>
        <Grid>
          <TextField
            InputProps={{ inputProps: { min: 0, max: 20 } }}
            type={"number"}
            label="총 세트수"
            value={temporary[1] * 1}
          />
        </Grid>
      </Grid>
    );
  };
  // 루틴이름
  // 1단위 박스
  //  운동이름 // 수행횟수 // 총횟수
  // 박스추가버튼
  return (
    <div>
      {ButtonType()}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>운동 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>추가/수정 내용을 작성해주세요</DialogContentText>
          <div>
            <Button
              id="basic-button"
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleMenuClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Dashboard
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {myRoutines &&
                myRoutines.map((item, index) => (
                  <MenuItem key={index} onClick={handleMenuClose}>
                    {item.title}
                  </MenuItem>
                ))}
            </Menu>
          </div>
          <TextField
            autoFocus
            error={Title !== "" && Title.split(" ").join("").length === 0}
            helperText={
              Title.split(" ").join("").length === 0
                ? Title === ""
                  ? ""
                  : "최소 한 글자 이상 입력해주세요!!"
                : ""
            }
            margin="dense"
            value={Title}
            label="루틴 이름"
            fullWidth
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
          />
          <Grid container direction="column">
            {timeGrid()}
            {props.data &&
              props.data.execute.map((item, index) => gridElement(item, index))}
            {props.date && gridElement()}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => console.log(Detail)}>test</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
