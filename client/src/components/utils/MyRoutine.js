import * as React from "react";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Collapse,
  CardActionArea,
  CardActions,
  Grid,
} from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import SettingPage from "../SettingPage/SettingPage";

export default function MyRoutine() {
  const [expanded, setExpanded] = React.useState("false");
  const myRoutine = useSelector((state) => state.routine.myRoutines);

  const handleExpandClick = (panel) => {
    if (expanded !== panel) {
      setExpanded(panel);
    } else {
      setExpanded("false");
    }
  };

  return (
    <Box>
      {myRoutine &&
        myRoutine.map((item, index) => (
          <Card key={index} sx={{ minWidth: 275 }}>
            <CardActionArea
              expanded={expanded === `panel${index + 1}` ? "true" : undefined}
              onClick={() => handleExpandClick(`panel${index + 1}`)}
              aria-expanded={expanded}
            >
              <CardContent>
                <Grid container direction="row">
                  <Typography variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {item.detail.length} Workouts
                  </Typography>
                </Grid>
              </CardContent>
            </CardActionArea>
            <Collapse
              in={expanded === `panel${index + 1}` ? true : undefined}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                {item.detail.map((workout, index) => (
                  <Grid key={`workout${index}`}>
                    <Typography>
                      {workout.name} {workout.contents.length} set
                    </Typography>
                  </Grid>
                ))}
              </CardContent>
            </Collapse>
            <Grid container direction="row" spacing={2}>
              <Button size="small">삭제</Button>
              <SettingPage data={item.detail} />
              <Button size="small">실행</Button>
            </Grid>
          </Card>
        ))}
    </Box>
  );
}

// <div>
//   {myRoutine &&
//     myRoutine.map((item, index) => (
//       <Accordion
//         key={index}
//         expanded={expanded === `panel${index + 1}`}
//         onChange={handleChange(`panel${index + 1}`)}
//       >
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography sx={{ width: "33%", flexShrink: 0 }}>
//             {item.title}
//           </Typography>
//           <Typography sx={{ color: "text.secondary" }}>
//             {item.detail.length} workouts
//           </Typography>
//         </AccordionSummary>
//         <Box>
//           <Button>Remove</Button>
//           <Button>Adjust</Button>
//           <Button>Start</Button>
//         </Box>
//         <AccordionDetails>
//           <Typography component="div">
//             {item.detail &&
//               item.detail.map((node, nodeIndex) => (
//                 <div key={nodeIndex}>
//                   {node.name} {node.contents.length} set
//                 </div>
//               ))}
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//     ))}
// </div>
