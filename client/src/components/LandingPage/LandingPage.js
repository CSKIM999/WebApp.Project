import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import Login from "../utils/Login";
import Register from "../utils/Register";

function LandingPage() {
  return (
    <Grid
      container
      sx={{ height: "100vh" }}
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Grid item>
        <Typography fontSize="1.1rem" variant="h5">
          App 사용을 위해 로그인이 필요합니다
        </Typography>
      </Grid>
      <Grid item sx={{ p: 1 }}>
        <Stack direction="column" alignItems="center">
          <Typography fontSize="0.8rem">
            회원가입 절차는 아주아주 간단합니다!!
          </Typography>
          <Typography fontSize="0.7rem">...만, 그게 귀찮으시다면?</Typography>
        </Stack>
      </Grid>
      <Grid item container direction="column" alignItems="center">
        <Stack>
          <Typography>SAMPLE ID : 찰스@cs.kim</Typography>
          <Typography>SAMPLE PW :1234</Typography>
        </Stack>
        <Stack sx={{ p: 2 }} direction="row" spacing={3}>
          <Login></Login>
          <Register></Register>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
