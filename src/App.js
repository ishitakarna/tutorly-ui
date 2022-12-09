import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Outlet, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LearnView from './components/Learn/LearnView';
import TeachView from './components/Teach/TeachView';
import ProfileView from './components/Profile/ProfileView';
import ScheduleView from './components/Schedule/ScheduleView';
import LoginView from './components/Login/LoginView';
import RegisterView from './components/Login/RegisterView';
import UserDetailView from './components/DetailView/UserDetailView';

function App() {
  return (
    <Router>
      <Routes>
          {/* Routes that need the NavBar*/}
          <Route path="/fp" element={<LayoutsWithNavbar />}>
            <Route path="/fp/learn" element={<LearnView/>} />
            <Route path="/fp/teach" element={<TeachView/>} />
            <Route path="/fp/profile" element={<ProfileView/>} />
            <Route path="/fp/schedule" element={<ScheduleView/>} />
          </Route>

          
          {/* Routes without the NavBar*/}
          <Route
            path="/"
            element={<LoginView/>}
          />

          <Route
            path="/fp/login"
            element={<LoginView/>}
          />
          <Route
            path="/fp/register"
            element={<RegisterView/>}
          />
          <Route
            path="/fp/userDetails"
            element={<UserDetailView/>}
          />
      </Routes>
    </Router>
  );
}

function LayoutsWithNavbar() {
  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  );
}

export default App;