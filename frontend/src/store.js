import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { coursesReducer, courseDetailsReducer, newCourseReducer, newTrackReducer, courseReducer, trackReducer, trackDetailsReducer } from "./reducers/courseReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  courses: coursesReducer,
  courseDetails: courseDetailsReducer,
  course: courseReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newCourse: newCourseReducer,
  newTrack: newTrackReducer,
  track: trackReducer,
  trackDetails: trackDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
