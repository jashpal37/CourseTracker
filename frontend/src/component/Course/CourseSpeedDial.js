import React, { Fragment, useState, useEffect } from "react";
import "./CourseSpeedDial.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { DELETE_COURSE_RESET } from "../../constants/courseConstants";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, clearErrors } from "../../actions/courseAction";

const CourseSpeedDial = ({ courseId, courseName }) => {
  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isDeleted } = useSelector((state) => state.course);

  const options = [
    { icon: <AddIcon />, name: "Add Track", func: addTrack },
    { icon: <NoteAltIcon />, name: "Update Course", func: updateCourse },
    { icon: <CancelIcon />, name: "Delete Course", func: deleteTheCourse },
  ];

  function addTrack() {
    history("/track/new", {
      state: { courseId: courseId, courseName: courseName },
    });
  }
  function deleteTheCourse() {
    dispatch(deleteCourse(courseId));
    // console.log(courseId);
  }

  function updateCourse() {
    history(`/course/update/${courseId}`);
  }


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      history("/");
      alert.success("Course Deleted Successfully");
      dispatch({ type: DELETE_COURSE_RESET });
    }

  }, [dispatch, alert, error, history, isDeleted]);

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="up"
        className="speedDial"
        icon={<AutoFixHighIcon />}
        FabProps={{
          sx: {
            bgcolor: "secondary.main",
            "&:hover": {
              bgcolor: "secondary.main",
            },
          },
        }}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default CourseSpeedDial;
