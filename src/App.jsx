import { Navigate, Route, Routes } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";
import AppLayout from "./ui/appLayout";

import LoginPage from "./pages/LoginPage";
import Error from "./utils/Error";
import AddNewTask from "./ui/navBarUI/AddNewTask";
import NotificationPage from "./pages/sideBarPages/NotificationPage";
import SettingsPage from "./pages/navBarPages/SettingsPage";
import ProgressPage from "./pages/navBarPages/ProgressPage";
import MenuPage from "./pages/navBarPages/MenuPage";
import HelpPage from "./pages/navBarPages/HelpPage";
import TodayPage from "./pages/sideBarPages/TodayPage";
import PlannedPage from "./pages/sideBarPages/PlannedPage";
import ImportantPage from "./pages/sideBarPages/ImportantPage";
import AssignedPage from "./pages/sideBarPages/AssignedPage";
import TaskPage from "./pages/sideBarPages/ProjectPage";
import WorkPage from "./pages/sideBarPages/WorkPage";
import PersonalPage from "./pages/sideBarPages/PersonalPage";
import HousePage from "./pages/sideBarPages/HousePage";
import SocialPage from "./pages/sideBarPages/SocialPage";
import CompletedPage from "./pages/sideBarPages/CompletedPage";
import TrashPage from "./pages/sideBarPages/TrashPage";
import FriendPage from "./pages/sideBarPages/FriendPage";
import Task from "./ui/sideBarUI/Task";
import EditTask from "./features/edit-task/EditTask";
import ProjectPage from "./pages/sideBarPages/ProjectPage";

function App() {
  return (
    <div className="font-sans flex justify-center items-center  w-screen h-screen shadow overflow-auto ">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="layout" element={<AppLayout />}>
          <Route index element={<Navigate replace to="today" />} />
          <Route path="today" element={<TodayPage />} />
          <Route path="planned" element={<PlannedPage />} />
          <Route path="important" element={<ImportantPage />} />
          <Route path="assigned" element={<AssignedPage />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="personal" element={<PersonalPage />} />
          <Route path="house" element={<HousePage />} />
          <Route path="social" element={<SocialPage />} />
          <Route path="completed" element={<CompletedPage />} />
          <Route path="trash" element={<TrashPage />} />
          <Route path="friend" element={<FriendPage />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="task/new" element={<AddNewTask />} />
          <Route path=":taskId" element={<EditTask />} />
          {/* <Route path=":taskId" element={<Task />} /> */}
          <Route path="today/:taskId" element={<EditTask />} />
          <Route path="important/:taskId" element={<EditTask />} />
          <Route path="assigned/:taskId" element={<EditTask />} />
          <Route path="project/:taskId" element={<EditTask />} />
          <Route path="work/:taskId" element={<EditTask />} />
          <Route path="personal/:taskId" element={<EditTask />} />
          <Route path="house/:taskId" element={<EditTask />} />
          <Route path="friend/:taskId" element={<EditTask />} />
          <Route path="social/:taskId" element={<EditTask />} />
          <Route path="completed/:taskId" element={<EditTask />} />
          <Route path="planned/:taskId" element={<EditTask />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
