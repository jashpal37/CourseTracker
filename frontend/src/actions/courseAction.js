import axios from "axios";

import {
  ALL_COURSE_FAIL,
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_FAIL,
  COURSE_DETAILS_SUCCESS,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  CREATE_TRACK_REQUEST,
  CREATE_TRACK_SUCCESS,
  CREATE_TRACK_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_RESET,
  DELETE_COURSE_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_RESET,
  UPDATE_COURSE_FAIL,
  UPDATE_TRACK_REQUEST,
  UPDATE_TRACK_SUCCESS,
  UPDATE_TRACK_RESET,
  UPDATE_TRACK_FAIL,
  DELETE_TRACK_REQUEST,
  DELETE_TRACK_SUCCESS,
  DELETE_TRACK_RESET,
  DELETE_TRACK_FAIL,
  TRACK_DETAILS_REQUEST,
  TRACK_DETAILS_SUCCESS,
  TRACK_DETAILS_RESET,
  TRACK_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/courseConstants";

//get data of all courses
export const getCourse = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_COURSE_REQUEST,
    });
    //TODO get courses of the particular user id.
    const { data } = await axios.get("/api/v1/courses");
    dispatch({
      type: ALL_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get particular course details i.e. tracks
export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/course/${id}`);
    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data.courseDetails,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Course
export const createCourse = (course) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COURSE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/course/new", course, config);

    dispatch({ type: CREATE_COURSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// Delete Course
export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COURSE_REQUEST });

    const { data } = await axios.delete(`/api/v1/course/${id}`);

    dispatch({
      type: DELETE_COURSE_SUCCESS,
      payload: data.sucess,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Course
export const updateCourse = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COURSE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/course/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: data.sucess,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Track
export const createTrack = (track) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TRACK_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/track/new", track, config);

    dispatch({ type: CREATE_TRACK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_TRACK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Track
export const updateTrack = (track) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TRACK_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/track/new", track, config);

    dispatch({ type: UPDATE_TRACK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_TRACK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete track
export const deleteTrack = (id,tid) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TRACK_REQUEST });

    const { data } = await axios.delete(`/api/v1/track/${id}/${tid}`);

    dispatch({
      type: DELETE_TRACK_SUCCESS,
      payload: data.sucess,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TRACK_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get particular track of the course details
export const getTrackDetails = (id,tid) => async (dispatch) => {
  try {
    dispatch({
      type: TRACK_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/track/${id}/${tid}`);
    dispatch({
      type: TRACK_DETAILS_SUCCESS,
      payload: data.trackDetails,
    });
  } catch (error) {
    dispatch({
      type: TRACK_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};