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
  const userId = useSelector((state) => state.user.userData._id);
  const [open, setOpen] = React.useState(false);
  const [Flag, setFlag] = React.useState(false);
  const [Hour, setHour] = React.useState(0);
  const [Minute, setMinute] = React.useState(0);
  const [Second, setSecond] = React.useState(0);
  const [Title, setTitle] = React.useState("");
  const [Detail, setDetail] = React.useState([]);
  const [OncardTitle, setOncardTitle] = React.useState([""]);
  const [OncardExec, setOncardExec] = React.useState([[0, 0]]);

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
    setDetail([{ name: "", progress: [0, 0] }]);
    setOncardTitle([""]);
    setOncardExec([[0, 0]]);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setFlag(false);
    if (!props.data) {
      reset();
    } else {
      setHour(props.data.runtime[0]);
      setMinute(props.data.runtime[1]);
      setSecond(props.data.runtime[2]);
      setTitle(props.data.name);
      const newData = JSON.parse(JSON.stringify(props.data.execute));
      setDetail([...newData]);
    }
  };

  const handleFormation = (index) => {
    if (index === undefined) {
      setDetail([...Detail, { name: "", progress: [0, 0] }]);
    } else {
      const newDetail = [...Detail];
      newDetail.splice(index, 1);
      setDetail([...newDetail]);
    }
  };

  const handleOncardTitle = (value, index) => {
    var newDetail = [...Detail];
    newDetail[index].name = value;
    setDetail([...newDetail]);
  };

  const handleOncardExec = (value, index, target) => {
    var newDetail = [...Detail];
    newDetail[index].progress[target] = value * 1;
    setDetail([...newDetail]);
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
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={2}>
          <TextField
            type={"number"}
            onChange={(event) => setHour(event.target.value * 1)}
            value={Hour}
            label={"시"}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            onChange={(event) => setMinute(event.target.value * 1)}
            type={"number"}
            value={Minute}
            label={"분"}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            onChange={(event) => setSecond(event.target.value * 1)}
            type={"number"}
            value={Second}
            label={"초"}
          />
        </Grid>
        <Grid item>
          <Button onClick={() => handleFormation()}>운동 추가</Button>
        </Grid>
      </Grid>
    );
  };
  const gridElement = (index) => {
    if (!index) {
      const index = 0;
    }
    return (
      <Grid key={index} item container direction="row">
        <Grid>
          <TextField
            onChange={(event) => handleOncardTitle(event.target.value, index)}
            error={Flag && Detail[index].name === ""}
            helperText={
              Flag && Detail[index].name === "" ? "이름을 입력해주세요" : ""
            }
            value={Detail[index].name}
            label="운동 이름"
          />
        </Grid>
        <Grid>
          <TextField
            InputProps={{
              inputProps: { min: 0, max: `${Detail[index].progress[1]}` },
            }}
            type={"number"}
            label="수행 세트"
            onChange={(event) => handleOncardExec(event.target.value, index, 0)}
            value={Detail[index].progress[0]}
          />
        </Grid>
        <Grid>
          <TextField
            InputProps={{ inputProps: { min: 0, max: 20 } }}
            type={"number"}
            label="총 세트수"
            onChange={(event) => handleOncardExec(event.target.value, index, 1)}
            value={Detail[index].progress[1]}
          />
        </Grid>
        <Grid>
          <Button onClick={() => handleFormation(index)}>DEL</Button>
        </Grid>
      </Grid>
    );
  };

  const handleSave = () => {
    setFlag(true);
    const body = {
      id: userId,
      name: Title,
      runtime: [Hour, Minute, Second],
      detail: Detail,
    };
    console.log(body);
  };
  const handleMenu = (props) => {
    console.log(props);
    handleMenuClose();
  };

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
                  <MenuItem key={index} onClick={() => handleMenu(item)}>
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
            {Detail && Detail.map((item, index) => gridElement(index))}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleSave()}>test huh</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
