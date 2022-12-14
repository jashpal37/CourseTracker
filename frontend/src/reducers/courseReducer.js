import {
  ALL_COURSE_FAIL,
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_FAIL,
  COURSE_DETAILS_SUCCESS,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_RESET,
  CREATE_COURSE_FAIL,
  CREATE_TRACK_REQUEST,
  CREATE_TRACK_SUCCESS,
  CREATE_TRACK_RESET,
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

export const coursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ALL_COURSE_REQUEST:
      return {
        loading: true,
        courses: [],
      };
    case ALL_COURSE_SUCCESS:
      return {
        loading: false,
        courseCount: action.payload.courseCount,
        courses: action.payload.courses,
      };
    case ALL_COURSE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case COURSE_DETAILS_SUCCESS:
      return {
        loading: false,
        course: action.payload,
      };
    case COURSE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_COURSE_SUCCESS:
      return {
        loading: false,
        course: action.payload,
        success: action.payload.sucess,
      };

    case CREATE_COURSE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_COURSE_RESET:
      return {
        ...state,
        sucess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const courseReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COURSE_REQUEST:
    case UPDATE_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_COURSE_FAIL:
    case UPDATE_COURSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_COURSE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_COURSE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newTrackReducer = (state = { track: {} }, action) => {
  switch (action.type) {
    case CREATE_TRACK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_TRACK_SUCCESS:
      return {
        loading: false,
        track: action.payload.track,
        success: action.payload.success,
      };

    case CREATE_TRACK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_TRACK_RESET:
      return {
        ...state,
        sucess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const trackReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRACK_REQUEST:
    case UPDATE_TRACK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TRACK_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_TRACK_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_TRACK_FAIL:
    case UPDATE_TRACK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TRACK_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_TRACK_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const trackDetailsReducer = (state = { track: {} }, action) => {
  switch (action.type) {
    case TRACK_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case TRACK_DETAILS_SUCCESS:
      return {
        loading: false,
        track: action.payload,
      };
    case TRACK_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TRACK_DETAILS_RESET:
      return {
        loading: false,
        track: {},
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
