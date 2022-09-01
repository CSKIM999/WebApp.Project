import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import { CardActionArea, Grid, Stack } from "@mui/material";
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
    const nowSetContents = props.routine[itemIndex].contents;
    var returnWord = `${setCount + 1} SET  `;
    var count = 0;
    try {
      if (option[0] === "weight") {
        const weight = nowSetContents[setCount][0];
        count = nowSetContents[setCount][1];
        returnWord += `${weight} Kg x ${count} 회`;
      } else if (option[0] === "count") {
        count = nowSetContents[setCount][1];
        returnWord += `${count} 회`;
      } else {
        // only time
        const timeUnit = option[2];
        count = nowSetContents[setCount][1];
        returnWord += `${count} ${timeUnit}`;
      }
    } catch (err) {
      return (
        <Typography variant="body1">
          SET DONE <DoneAll fontSize="small" />
        </Typography>
      );
    }
    return <Typography variant="body1">{returnWord}</Typography>;
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
                // disabled={activeStep[index] === contentsLength}
              >
                <CardContent>
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
                      <BackspaceOutlinedIcon fontSize="small" sx={{ p: 1 }} />{" "}
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
