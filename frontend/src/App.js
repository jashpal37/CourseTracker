import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./component/Home/Home.js";
import WebFont from "webfontloader";
import Appbar from "./component/layout/Appbar";
import CourseDetails from "./component/Course/courseDetails.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import UserOptions from "./component/layout/Header/UserOptions";
import NewCourse from "./component/Course/NewCourse";
import NewTrack from "./component/Course/NewTrack";
import UpdateCourse from "./component/Course/UpdateCourse";
import UpdateTrack from "./component/Course/UpdateTrack";
import store from "./store.js";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Appbar />}>
          <Route index element={<Home />} />
          <Route path="course/:id" element={<CourseDetails />} />
          <Route path="Login/" element={<LoginSignUp />} />
          <Route
            path="account/"
            element={isAuthenticated ? <Profile /> : <LoginSignUp />}
          />
          <Route
            path="me/update"
            element={isAuthenticated ? <UpdateProfile /> : <LoginSignUp />}
          />
          <Route
            path="password/update"
            element={isAuthenticated ? <UpdatePassword /> : <LoginSignUp />}
          />
          <Route path="password/forgot" element={<ForgotPassword />} />
          <Route path="password/reset/:token" element={<ResetPassword />} />
          <Route path="course/new" element={ isAuthenticated ? <NewCourse /> : <LoginSignUp />} />
          <Route path="track/new" element={<NewTrack />} />
          <Route path="track/update" element={<UpdateTrack />} />
          <Route path="course/update/:id" element={<UpdateCourse />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
