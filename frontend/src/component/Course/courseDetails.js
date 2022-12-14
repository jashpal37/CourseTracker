import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  getCourseDetails,
  updateTrack,
} from "../../actions/courseAction";
import Progress from "./Progress";
import { useParams } from "react-router-dom";
import "./courseDetails.css";
import CourseSpeedDial from "./CourseSpeedDial";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  UPDATE_TRACK_RESET,
  TRACK_DETAILS_RESET,
} from "../../constants/courseConstants";
import Chip from "@mui/material/Chip";

const CourseDetails = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const alert = useAlert();
  const { loading, course, error } = useSelector(
    (state) => state.courseDetails
  );
  const {
    error: UpdateError,
    isUpdated,
    loading: UpdateLoading,
  } = useSelector((state) => state.track);

  const handleChangeBookmarked = (checked, tid) => {
    // console.log(checked, tid);
    const myForm = new FormData();

    myForm.set("bookmark", checked ? "1" : "");
    myForm.set("updating", "bookmark");
    myForm.set("courseId", id);
    myForm.set("trackId", tid);

    dispatch(updateTrack(myForm));
  };

  const handleChangeCompleted = (completed, tid) => {
    const myForm = new FormData();

    myForm.set("done", completed ? "1" : "");
    myForm.set("updating", "done");
    myForm.set("courseId", id);
    myForm.set("trackId", tid);

    dispatch(updateTrack(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch({ type: TRACK_DETAILS_RESET });

    if (isUpdated) {
      // alert.success("Track updated Successfully");
      dispatch({ type: UPDATE_TRACK_RESET });
      dispatch({ type: TRACK_DETAILS_RESET });
      // history(`/course/${courseId}`);
    }

    dispatch(getCourseDetails(id));
  }, [dispatch, isUpdated]);

  function goToUpdateTrack(tid) {
    console.log("redirecting to update");
    history("/track/update", {
      state: { courseId: id, trackId: tid },
    });
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      flex: 0.7,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 300,
      flex: 1,
    },
    {
      field: "bookmark",
      headerName: "Bookmark",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Checkbox
              checked={params.row.bookmark}
              onChange={() =>
                handleChangeBookmarked(!params.row.bookmark, params.row.id)
              }
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon />}
            />
          </>
        );
      },
      flex: 0.2,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              color="primary"
              onClick={() => goToUpdateTrack(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
      flex: 0.2,
    },
    {
      field: "completed",
      headerName: "Completed",
      width: 160,
      renderCell: (params) => {
        let chipData = `${
          params.row.hours < 10 ? `0${params.row.hours}` : params.row.hours
        }:${
          params.row.minutes < 10
            ? `0${params.row.minutes}`
            : params.row.minutes
        }`;

        return (
          <>
            <Checkbox
              checked={params.row.completed}
              onChange={() =>
                handleChangeCompleted(!params.row.completed, params.row.id)
              }
            />
            <Chip
              className="timeChip"
              size="small"
              label={chipData}
              color="primary"
              variant="outlined"
            />
          </>
        );
      },
      flex: 0.3,
    },
  ];

  const rows = [];

  course &&
    course.tracks &&
    course.tracks.forEach((item) => {
      rows.push({
        name: item.name,
        notes: item.notes,
        bookmark: item.bookmark,
        completed: item.done,
        hours: item.totalDuration.hours,
        minutes: item.totalDuration.minutes,
        id: item._id,
      });
    });

  return (
    <React.Fragment>
      {loading ? (
        <h1>waiting... ... ...</h1>
      ) : (
        <React.Fragment>
          <MetaData title={"Course Details"} />

          <>
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
                  {course && course.doneDuration && course.doneDuration.hours} : { course && course.doneDuration && course.doneDuration.minutes} /{" "}
                  {course && course.totalDuration && course.totalDuration.hours} : {course && course.totalDuration && course.totalDuration.minutes}
                </p>
              </div>
            </div>
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
                  {course && course.name}
                </Typography>
              </div>
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "60rem",
                  height: "7rem",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {course && course.description}
                </Typography>
              </div>
            </div>

          </>

          <br />
          <br />
          <div className="tableDiv">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={15}
              disableSelectionOnClick
              autoHeight
              sx={{ width: 1 }}
            />
          </div>
          <CourseSpeedDial courseId={id} courseName={course.name} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CourseDetails;
