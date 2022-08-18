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
  const [Weight, setWeight] = React.useState(20);
  const [Title, setTitle] = React.useState("");
  const [Detail, setDetail] = React.useState([20, 10]);

  // [...state,newValue]

  const handleSetcount = (event) => {
    if (!Detail.length) {
      setSetcount(event.target.value * 1);
      setDetail(Array(event.target.value * 1).fill([Weight, 10]));
    } else {
      setSetcount(event.target.value * 1);
      if (event.target.value * 1 < Setcount) {
        setDetail(Detail.slice(0, -1));
      } else {
        setDetail([...Detail, Detail.at(-1)]);
      }
    }
  };

  const handleClickOpen = () => {
    setTitle("");
    setOpen(true);
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
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    const body = {
      name: Title,
      option: [TypeTop, TypeBtm],
      contents: [Setcount],
    };
    if (Title && Title.split(" ").join("").length) {
      console.log(body);
      setOpen(false);
    } else {
      setTitle(" ");
      console.log("err");
    }
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
            error={Title !== "" && Title.split(" ").join("").length === 0}
            helperText={
              Title.split(" ").join("").length === 0
                ? Title === ""
                  ? ""
                  : "최소 한 글자 이상 입력해주세요!!"
                : ""
            }
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
            <TextField
              InputProps={{ inputProps: { min: 1, max: 20 } }}
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
                      }}
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
                      }}
                    />
                  </Grid>
                ))}
              {TypeBtm === "only" && (
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
                    }}
                  />
                  <TextField
                    sx={{ width: "5rem" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">개</InputAdornment>
                      ),
                      value: Detail[0][1],
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => console.log(Detail, Setcount)}>test</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
