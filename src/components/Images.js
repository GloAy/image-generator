import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { ExpandMoreSharp } from "@material-ui/icons";
import Collapse from "@mui/material/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Likes from "./Likes";

const url =
  "https://api.nasa.gov/planetary/apod?api_key=LD5HhDc0rPNz1DgDrKs6XEpGuoOiMQiQSapqTZN5";

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

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    maxWidth: 600,
  },
  image: {
    height: 500,
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
}));

const Images = () => {
  const [images, setImages] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    async function fetchImages() {
      let result = await axios.get(url);
      result = result.data;
      setImages(result);
    }
    fetchImages();
  }, []);

  return (
    <div>
      <Container className={classes.container}>
        <Typography variant="h3" paragraph>
          SpaceGram
        </Typography>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
                G
              </Avatar>
            }
            title={images.copyright}
            subheader={images.date}
          />
          <CardMedia
            component="img"
            image={images.url}
            alt={images.title}
            className={classes.image}
          />
          <CardContent>
            <Likes />
            <CardActions disableSpacing>
              <Typography
                variant="body1"
                color="text.secondary"
                align="left"
                paragraph
              >
                {images.title}
              </Typography>
            </CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="see description"
              desription={images.explanation}
            >
              <ExpandMoreSharp />
            </ExpandMore>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography
              variant="body1"
              color="text.secondary"
              align="left"
              alt={images.explanation}
            >
              {images.explanation}
            </Typography>
          </Collapse>
        </Card>
      </Container>
    </div>
  );
};

export default Images;
