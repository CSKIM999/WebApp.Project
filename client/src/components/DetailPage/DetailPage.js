import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Container,
  Fab,
  FormControlLabel,
  FormLabel,
  ListItemText,
  RadioGroup,
  Radio,
  FormControl,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Stack } from "@mui/system";

// 트랜지션그룹 사용예정

export default function DetailPage(props) {
  const [open, setOpen] = React.useState(false);
  const [TypeTop, setTypeTop] = React.useState("weight");
  const [TypeBtm, setTypeBtm] = React.useState("only");

  const [Title, setTitle] = React.useState("");
  const [Detail, setDetail] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleTypeTop = (event, newTypeTop) => {
    setTypeTop(newTypeTop);
  };
  const handleTypeBtm = (event, newTypeBtm) => {
    setTypeBtm(newTypeBtm);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    props.setRoutine(Title);
    setOpen(false);
  };
  return (
    <div>
      <Fab variant="extended" onClick={handleClickOpen}>
        운동 추가
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>운동 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            추가하고 싶은 운동을 작성해주세요
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="운동이름"
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
          >
            <ToggleButtonGroup
              sx={{ width: "100%" }}
              color="primary"
              value={TypeTop}
              exclusive
              onChange={handleTypeTop}
            >
              <ToggleButton value="weight">무게 & 개수</ToggleButton>
              <ToggleButton value="count">개수만</ToggleButton>
              <ToggleButton value="time">시간</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              color="primary"
              value={TypeBtm}
              exclusive
              onChange={handleTypeBtm}
            >
              <ToggleButton value="only">전체세트 동일</ToggleButton>
              <ToggleButton value="each">세트마다 다름</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
