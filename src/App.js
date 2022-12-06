import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Outlet, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LearnView from './components/Learn/LearnView';
import TeachView from './components/Teach/TeachView';
import ProfileView from './components/Profile/ProfileView';
import ScheduleView from './components/Schedule/ScheduleView';
import LoginView from './components/Login/LoginView';

function App() {
  return (
    <Router>
      <Routes>
          {/* Routes that need the NavBar*/}
          <Route path="/" element={<LayoutsWithNavbar />}>
            <Route path="/learn" element={<LearnView/>} />
            <Route path="/teach" element={<TeachView/>} />
            <Route path="/profile" element={<ProfileView/>} />
            <Route path="/schedule" element={<ScheduleView/>} />
          </Route>

          {/* Routes without the NavBar*/}
          <Route
            path="/login"
            element={<LoginView/>}
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