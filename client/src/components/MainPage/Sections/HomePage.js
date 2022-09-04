import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React from "react";
import Settingpage from "../../SettingPage/SettingPage";
import MyRoutine from "../../utils/MyRoutine";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";
import Logout from "../../utils/Logout";
import { Stack } from "@mui/material";
import { LogoutOutlined, ManageAccounts } from "@mui/icons-material";

function HomePage(props) {
  const myRoutine = useSelector((state) => state.routine.myRoutines);
  const user = useSelector((state) => state.user.userData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const useHelper = () => {
    if (myRoutine && myRoutine.length === 0) {
      return (
        <Box>
          <Typography>아직 루틴이 없으시네요!</Typography>
          <Typography>루틴을 한번 추가해보세요!</Typography>
          <Settingpage state="C" />
        </Box>
      );
    } else {
      return (
        <Typography variant="button" gutterBottom>
          내 루틴 빠른 시작
        </Typography>
      );
    }
  };
  return (
    <Stack alignItems="center" direction="column" sx={{ pt: "0.5rem" }}>
      <Stack sx={{ width: "80vw" }} spacing={1}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">MainPage</Typography>
          </Grid>

          <Grid item>
            <IconButton style={{ padding: 0 }} onClick={handleClick}>
              <ManageAccounts />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                <Logout />
                {/* LOGOUT
                <LogoutOutlined sx={{ pl: 1 }} /> */}
              </MenuItem>
            </Menu>
            {/* <Logout /> */}
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            🙋‍♂️{user ? `${user.nickname}님 ` : ""}반갑습니다!🙋‍♀️
          </Typography>
        </Grid>
        <Grid item>{useHelper()}</Grid>
      </Stack>
      <Stack>
        <MyRoutine swipe={props.swipe} />
      </Stack>
    </Stack>
  );
}

export default HomePage;
