import * as React from "react";
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
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { Alert, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Stack } from "@mui/system";

export default function HistoryAdjust(props) {
  const [open, setOpen] = React.useState(false);
  const [Setcount, setSetcount] = React.useState(1);
  const [TypeTop, setTypeTop] = React.useState("weight");
  const [TypeBtm, setTypeBtm] = React.useState("only");
  const [TimeUnit, setTimeUnit] = React.useState("초");
  const [Title, setTitle] = React.useState("");
  const [Detail, setDetail] = React.useState([[20, 10]]);

  const handleClickOpen = () => {
    setTitle("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
  return (
    <div>
      {/* <Fab variant="extended" onClick={handleClickOpen}>
        운동 추가
        <AddIcon />
      </Fab> */}
      {ButtonType()}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>루틴 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            추가하고 싶은 운동을 작성해주세요
          </DialogContentText>
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
            label="루틴이름"
            fullWidth
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
          />
        </DialogContent>

        <DialogContent>
          <Stack
            sx={{ width: "100%" }}
            justifyContent="space-around"
            spacing={2}
          ></Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {}}>Save</Button>
          <Button onClick={() => console.log(Detail)}>test</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
