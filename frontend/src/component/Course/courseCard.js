import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Link } from "react-router-dom";
import "./courseCard.css";
import Progress from "./Progress";

export default function CourseCard({ course }) {
  return (
    <Link to={`/course/${course._id}`}>
      <Card
        className="card"
        sx={{
          maxWidth: 350,
          padding: "5px",
          backgroundColor: "rgb(234, 242, 248)",
          borderRadius: "1%",
          marginTop: "2vh",
          transition: "1s",
          maxHeight: 170,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <div className="courseInfo">
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "8rem",
                  height: "2rem",
                }}
              >
                <Typography component="div" variant="h5" nowrap>
                  {course.name}
                </Typography>
              </div>
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "8rem",
                  height: "7rem",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {course.description}
                </Typography>
              </div>
            </div>
            <div className="progressDiv">
              <div className="trackProgress">
                <Progress
                  progress={(course.doneTracks * 100) / course.totalTracks}
                />
                <hr />
                <p className="progressInfo">
                  Track
                  <br />
                  {course.doneTracks} / {course.totalTracks}
                </p>
              </div>

              <div className="timeProgress">
                <Progress
                  progress={
                    course &&
                    course.doneDuration &&
                    ((course.doneDuration.minutes +
                      course.doneDuration.hours * 60) *
                      100) /
                      (course.totalDuration.minutes +
                        course.totalDuration.hours * 60)
                  }
                />
                <hr />
                <p className="progressInfo">
                  Time
                  <br />
                  {course.doneDuration.hours} : {course.doneDuration.minutes} /{" "}
                  {course.totalDuration.hours} : {course.totalDuration.minutes}
                </p>
              </div>
            </div>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}
