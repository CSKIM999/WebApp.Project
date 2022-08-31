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
import { display } from "@mui/system";

export default function DetailPage(props) {
  const [open, setOpen] = React.useState(false);
  const [Setcount, setSetcount] = React.useState(1);
  const [TypeTop, setTypeTop] = React.useState("weight");
  const [TypeBtm, setTypeBtm] = React.useState("only");
  const [TimeUnit, setTimeUnit] = React.useState("초");
  const [Title, setTitle] = React.useState("");
  const [Detail, setDetail] = React.useState([[20, 10]]);

  const reset = () => {
    setSetcount(1);
    setTypeTop("weight");
    setTypeBtm("only");
    setTimeUnit("초");
    setTitle("");
    setDetail([[20, 10]]);
  };

  const handleSetcount = (event) => {
    const Changed = event.target.value * 1;
    if (event.target.value === "") {
      setSetcount("");
    } else {
      setSetcount(Changed);
    }
    if (Changed < Setcount) {
      setDetail(Detail.slice(0, -(Setcount - Changed)));
    } else {
      var array = [];
      for (var i = 0; i < Changed - Setcount; i++) {
        array.push([20, 10]);
      }
      setDetail([...Detail, ...array]);
    }
  };

  const handleClickOpen = () => {
    setTitle("");
    setOpen(true);
    if (!props.data) {
      reset();
    } else {
      setSetcount(props.data.contents.length);
      setTypeTop(props.data.option[0]);
      setTypeBtm(props.data.option[1]);
      setTimeUnit(props.data.option[2]);
      setTitle(props.data.name);
      setDetail(props.data.contents);
    }
  };
  const handleTypeTop = (event, newTypeTop) => {
    if (newTypeTop !== null) {
      setTypeTop(newTypeTop);
    }
  };
  const handleTypeBtm = (event, newTypeBtm) => {
    if (newTypeBtm !== null) {
      setTypeBtm(newTypeBtm);
    }
  };
  const handleTimeUnit = (event, newTimeUnit) => {
    if (newTimeUnit !== null) {
      switch (newTimeUnit) {
        case "sec":
          setTimeUnit("초");
          break;
        case "min":
          setTimeUnit("분");
          break;
        case "hour":
          setTimeUnit("시간");
          break;
        default:
          break;
      }
    }
  };

  const handleDetail = (event, index) => {
    if (event === undefined) {
      event = 0;
    }
    var newDetail = [...Detail];
    newDetail[index[0]][index[1]] = event * 1;
    setDetail(newDetail);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const body = {
      name: Title,
      option: [TypeTop, TypeBtm, TimeUnit],
      contents: Detail,
    };
    if (Title && Title.split(" ").join("").length) {
      // save
      setOpen(false);
    } else {
      // save err
      setTitle(" ");
    }

    props.setRoutine(body, props.adj);
  };
  const ButtonType = () => {
    if (!props.data) {
      return (
        <Fab variant="extended" onClick={handleClickOpen}>
          운동 추가
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
      {ButtonType()}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>운동 추가</DialogTitle>
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
            <TextField
              InputProps={{ inputProps: { min: 0, max: 20 } }}
              type={"number"}
              label="1 SET - 20 SET"
              value={Setcount}
              onChange={handleSetcount}
            />
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
            <ToggleButtonGroup
              color="primary"
              value={
                TimeUnit === "초" ? "sec" : TimeUnit === "분" ? "min" : "hour"
              }
              exclusive
              onChange={handleTimeUnit}
              sx={{ display: TypeTop === "time" ? "" : "none" }}
            >
              <ToggleButton value="sec">초</ToggleButton>
              <ToggleButton value="min">분</ToggleButton>
              <ToggleButton value="hour">시간</ToggleButton>
            </ToggleButtonGroup>
            <Grid container direction="column">
              {TypeBtm === "each" &&
                Detail.map((item, index) => (
                  <Grid key={index}>
                    <TextField
                      sx={{
                        width: "6rem",
                        display: TypeTop === "weight" ? "" : "none",
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kg</InputAdornment>
                        ),
                        value: item[0],
                        inputProps: { min: 0, max: 1000 },
                      }}
                      type={"number"}
                      onChange={(event) =>
                        handleDetail(event.target.value, [index, 0])
                      }
                    />
                    <TextField
                      sx={{ width: "5rem" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {TypeTop !== "time" ? "개" : TimeUnit}
                          </InputAdornment>
                        ),
                        value: item[1],
                        inputProps: { min: 0, max: 500 },
                      }}
                      type={"number"}
                      onChange={(event) =>
                        handleDetail(event.target.value, [index, 1])
                      }
                    />
                  </Grid>
                ))}
              {TypeBtm === "only" && Setcount > 0 && (
                <Grid>
                  <TextField
                    sx={{
                      width: "6rem",
                      display: TypeTop === "weight" ? "" : "none",
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
                      value: Detail[0][0],
                      inputProps: { min: 0, max: 1000 },
                    }}
                    type={"number"}
                    onChange={(event) =>
                      handleDetail(event.target.value, [0, 0])
                    }
                  />
                  <TextField
                    sx={{ width: "5rem" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {TypeTop !== "time" ? "개" : TimeUnit}
                        </InputAdornment>
                      ),
                      value: Detail[0][1],
                      inputProps: { min: 0, max: 500 },
                    }}
                    type={"number"}
                    onChange={(event) =>
                      handleDetail(event.target.value, [0, 1])
                    }
                  />
                </Grid>
              )}
            </Grid>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => console.log(Detail)}>test</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
