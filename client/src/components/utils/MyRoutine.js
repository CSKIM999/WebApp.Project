import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Collapse,
  CardActionArea,
  CardActions,
} from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import { useSelector } from "react-redux";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MyRoutine() {
  const [expanded, setExpanded] = React.useState(false);
  const myRoutine = useSelector((state) => state.routine.myRoutines);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      {myRoutine &&
        myRoutine.map((item, index) => (
          <Card key={index} sx={{ minWidth: 275 }}>
            <CardActionArea
              expanded={expanded === `panel${index + 1}`}
              onClick={handleChange(`panel${index + 1}`)}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>thank-you</CardContent>
            </Collapse>
            <Button size="small">Learn More</Button>
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
