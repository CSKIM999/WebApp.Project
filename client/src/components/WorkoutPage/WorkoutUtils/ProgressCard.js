import * as React from "react";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import {
  Button,
  Card,
  LinearProgress,
  Typography,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
} from "@mui/material";
import { DoneAll } from "@mui/icons-material";
export default function ProgressCard(props) {
  const [activeStep, setActiveStep] = React.useState(
    Array(props.routine.length).fill(0)
  );

  const handleNext = (index) => {
    const newStep = [...activeStep];
    newStep[index]++;
    setActiveStep([...newStep]);
    props.getProgress([...newStep]);
  };

  const handleBack = (index) => {
    if (activeStep[index] === 0) {
      return;
    }
    const newStep = [...activeStep];
    newStep[index]--;
    setActiveStep([...newStep]);
    props.getProgress([...newStep]);
  };

  const handleContent = (option, itemIndex) => {
    const setCount = activeStep[itemIndex];
    const nowSetContents = props.routine[itemIndex].contents[setCount];
    var returnWord = "";
    try {
      if (option[0] === "weight") {
        returnWord = `${nowSetContents[0]} Kg x ${nowSetContents[1]} 회`;
      } else if (option[0] === "count") {
        returnWord = `${nowSetContents[1]} 회`;
      } else {
        returnWord = `${nowSetContents[1]} ${option[2]}`;
      }
    } catch (err) {
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body1">SET DONE</Typography>
          <DoneAll fontSize="small" />
        </Stack>
      );
    }
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body1">{setCount + 1} SET</Typography>
        <Typography variant="body1">{returnWord}</Typography>
      </Stack>
    );
  };

  return (
    <Stack justifyContent={"center"} spacing={1}>
      {props.routine &&
        props.routine.map((item, index) => {
          const contentsLength = item.contents.length;
          return (
            <Card key={index}>
              <CardActionArea
                sx={{ minWidth: 300, width: "90vw" }}
                component="span"
                onClick={() => {
                  activeStep[index] !== contentsLength && handleNext(index);
                }}
              >
                <CardContent sx={{ pb: 0 }}>
                  <Typography variant="h5" gutterBottom>
                    {item.name}
                  </Typography>
                  {handleContent(item.option, index)}
                </CardContent>
                <Grid
                  container
                  justifyContent="space-between"
                  flex={{ alignItems: "center" }}
                  direction="row"
                >
                  <Grid item xs={8} sx={{ pl: 2 }}>
                    <LinearProgress
                      style={{ height: 10, borderRadius: 5 }}
                      variant="determinate"
                      value={(activeStep[index] * 100) / contentsLength}
                      onClick={(event) => {
                        handleBack(index);
                      }}
                    />
                  </Grid>
                  <Grid item sx={{ pr: 2 }}>
                    <Button
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleBack(index);
                      }}
                    >
                      <BackspaceOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                      -1 Set
                    </Button>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          );
        })}
    </Stack>
  );
}
