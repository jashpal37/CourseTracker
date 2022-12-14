import React, { useEffect, useState } from "react";
import "./NewCourse.css";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { CREATE_COURSE_RESET } from "../../constants/courseConstants";
import { useNavigate } from "react-router-dom";
import { clearErrors, createCourse } from "../../actions/courseAction.js";

const NewCourse = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newCourse);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [totalTracks, setTotalTracks] = useState(0);
  const [doneTracks, setDoneTracks] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [doneHours, setDoneHours] = useState(0);
  const [doneMinutes, setDoneMinutes] = useState(0);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Course Created Successfully");
      history("/");
      dispatch({ type: CREATE_COURSE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createCourseSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("totalTracks", totalTracks);
    myForm.set("doneTracks", doneTracks);
    myForm.set("totalHours", totalHours);
    myForm.set("totalMinutes", totalMinutes);
    myForm.set("doneHours", doneHours);
    myForm.set("doneMinutes", doneMinutes);

    dispatch(createCourse(myForm));
  };

  return (
    <div>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto",backgroundColor: "rgb(234, 242, 248)",   borderRadius: "3%", marginTop: "2vh", boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"}}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              New Course Details
            </Typography>

            <form
              onSubmit={createCourseSubmitHandler}
              encType="multipart/form-data"
            >
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    label="Name"
                    variant="outlined"
                    placeholder="Enter course Name"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    multiline
                    rows={4}
                    placeholder="Enter course Description"
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    placeholder="Total Tracks"
                    label="Total Tracks"
                    variant="outlined"
                    value={totalTracks}
                    onChange={(e) => setTotalTracks(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    placeholder="Done Tracks"
                    label="Completed Tracks"
                    variant="outlined"
                    value={doneTracks}
                    onChange={(e) => {
                      if (parseInt(e.target.value) > parseInt(totalTracks))
                        return;

                      return setDoneTracks(e.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="para">
                  Total Duration
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    placeholder="HH"
                    label="Hours"
                    variant="outlined"
                    onChange={(e) => setTotalHours(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    placeholder="MM"
                    label="Minutes"
                    variant="outlined"
                    onChange={(e) => setTotalMinutes(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="para">
                  Done Duration
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    placeholder="HH"
                    label="Hours"
                    variant="outlined"
                    onChange={(e) => setDoneHours(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    placeholder="MM"
                    label="Minutes"
                    variant="outlined"
                    onChange={(e) => setDoneMinutes(e.target.value)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default NewCourse;
