import * as React from "react";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  InputAdornment,
  DialogTitle,
  IconButton,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Build, Add, AddCircle, RemoveCircle } from "@mui/icons-material";

export default function DetailPage(props) {
  const [open, setOpen] = React.useState(false);
  const [SubmitFlag, setSubmitFlag] = React.useState(false);
  const [Setcount, setSetcount] = React.useState(1);
  const [TypeTop, setTypeTop] = React.useState("weight");
  const [TypeBtm, setTypeBtm] = React.useState("only");
  const [TimeUnit, setTimeUnit] = React.useState("초");
  const [Title, setTitle] = React.useState("");
  const [Detail, setDetail] = React.useState([[20, 10]]);

  const reset = (Adjust) => {
    setSubmitFlag(false);
    setSetcount(Adjust ? Adjust.contents.length : 1);
    setTypeTop(Adjust ? Adjust.option[0] : "weight");
    setTypeBtm(Adjust ? Adjust.option[1] : "only");
    setTimeUnit(Adjust ? Adjust.option[2] : "초");
    setTitle(Adjust ? Adjust.name : "");
    setDetail(Adjust ? Adjust.contents : [[20, 10]]);
  };

  const handleSetcount = (value) => {
    var Changed = value * 1;
    if (Changed > 20) {
      Changed = 20;
    } else if (Changed < 1) {
      Changed = 1;
    }
    if (value === "") {
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
      reset(props.data);
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
          setTimeUnit("분");
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
      setOpen(false);
    } else {
      setSubmitFlag(true);
      setTitle("");
      return;
    }
    props.setRoutine(body, props.adj);
  };
  const ButtonType = () => {
    if (!props.data) {
      return (
        <Fab
          variant="extended"
          size="medium"
          onClick={handleClickOpen}
          sx={{ py: 1, mt: 1, ml: 1, borderRadius: 3 }}
          color="secondary"
        >
          <Typography variant="subtitle2" fontSize="0.73rem">
            운동추가
          </Typography>
          <Add />
        </Fab>
      );
    } else {
      return (
        <Button onClick={handleClickOpen} size="small">
          수정
          <Build fontSize="small" />
        </Button>
      );
    }
  };
  const inputProps = (min, max) => {
    return {
      min: min,
      max: max,
      style: { padding: "0.5rem", textAlign: "center" },
    };
  };
  return (
    <div>
      {ButtonType()}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography fontSize="1.5rem" variant="body2">
            운동 {props.data ? "수정" : "추가"}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ height: "6rem", pb: 0 }}>
          <Typography sx={{ py: 0.5 }} fontSize="0.8rem" variant="subtitle1">
            {props.data ? "수정" : "추가"}하시려는 내용을 작성해주세요
          </Typography>
          <TextField
            error={SubmitFlag && Title === ""}
            helperText={
              SubmitFlag && Title === "" ? "한글자 이상 입력해주세요!" : ""
            }
            margin="dense"
            value={Title}
            label="운동이름"
            fullWidth
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
          />
        </DialogContent>
        <DialogContent sx={{ pt: 2 }}>
          <Stack
            sx={{ width: "100%" }}
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Stack
              sx={{ minWidth: "210px", width: "60%" }}
              alignItems="center"
              justifyContent="center"
              direction="row"
              spacing={2}
            >
              <IconButton
                fontSize="small"
                onClick={() => handleSetcount(Setcount - 1)}
                style={{ padding: "0.3rem" }}
              >
                <RemoveCircle fontSize="small" color="primary" />
              </IconButton>
              <TextField
                InputProps={{
                  inputProps: inputProps(0, 20),
                  endAdornment: (
                    <InputAdornment position="start">SET</InputAdornment>
                  ),
                }}
                type={"number"}
                label="1 SET - 20 SET"
                value={Setcount}
                onChange={(event) => handleSetcount(event.target.value)}
                sx={{ width: "30vw" }}
              />
              <IconButton
                fontSize="small"
                onClick={() => handleSetcount(Setcount + 1)}
                style={{ padding: "0.3rem" }}
              >
                <AddCircle fontSize="small" color="primary" />
              </IconButton>
            </Stack>
            <ToggleButtonGroup
              color="primary"
              value={TypeTop}
              size="small"
              exclusive
              fullWidth
              onChange={handleTypeTop}
            >
              <ToggleButton sx={{ fontSize: "0.7rem" }} value="weight">
                무게,개수
              </ToggleButton>
              <ToggleButton value="count">개수만</ToggleButton>
              <ToggleButton value="time">시간</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              color="primary"
              value={TypeBtm}
              size="small"
              fullWidth
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
              size="small"
              fullWidth
              exclusive
              onChange={handleTimeUnit}
              sx={{ display: TypeTop === "time" ? "" : "none" }}
            >
              <ToggleButton value="sec">초</ToggleButton>
              <ToggleButton value="min">분</ToggleButton>
              <ToggleButton value="hour">시간</ToggleButton>
            </ToggleButtonGroup>
            <Stack alignItems="center" spacing={1}>
              {TypeBtm === "each" &&
                Detail.map((item, index) => (
                  <Stack justifyContent="center" direction="row" key={index}>
                    <TextField
                      sx={{
                        width: "6rem",
                        display: TypeTop === "weight" ? "" : "none",
                        pr: 2,
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Kg</InputAdornment>
                        ),
                        value: item[0],
                        inputProps: inputProps(0, 1000),
                      }}
                      type={"number"}
                      onChange={(event) =>
                        handleDetail(event.target.value, [index, 0])
                      }
                    />
                    <TextField
                      sx={{ width: "6rem" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {TypeTop !== "time" ? "개" : TimeUnit}
                          </InputAdornment>
                        ),
                        value: item[1],
                        inputProps: inputProps(0, 500),
                      }}
                      type={"number"}
                      onChange={(event) =>
                        handleDetail(event.target.value, [index, 1])
                      }
                    />
                  </Stack>
                ))}
              {TypeBtm === "only" && Setcount > 0 && (
                <Stack direction="row">
                  <TextField
                    sx={{
                      width: "6rem",
                      display: TypeTop === "weight" ? "" : "none",
                      pr: 2,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Kg</InputAdornment>
                      ),
                      value: Detail[0][0],
                      inputProps: inputProps(0, 1000),
                    }}
                    type={"number"}
                    onChange={(event) =>
                      handleDetail(event.target.value, [0, 0])
                    }
                  />
                  <TextField
                    sx={{ width: "6rem" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {TypeTop !== "time" ? "개" : TimeUnit}
                        </InputAdornment>
                      ),
                      value: Detail[0][1],
                      inputProps: inputProps(0, 500),
                    }}
                    type={"number"}
                    onChange={(event) =>
                      handleDetail(event.target.value, [0, 1])
                    }
                  />
                </Stack>
              )}
            </Stack>
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
