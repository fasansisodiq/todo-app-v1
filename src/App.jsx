import { Navigate, Route, Routes } from "react-router-dom";

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";
import AppLayout from "./ui/AppLayout";
import LoginPage from "./pages/LoginPage";
import AddNewTask from "./features/add-task/AddNewTask";
import NotificationPage from "./pages/sideBarPages/NotificationPage";
import SettingsPage from "./pages/navBarPages/SettingsPage";
import ProgressPage from "./pages/navBarPages/ProgressPage";
import MenuPage from "./pages/navBarPages/menu/MenuPage";
import HelpPage from "./pages/navBarPages/help-center/HelpPage";
import TodayPage from "./pages/sideBarPages/TodayPage";
import PlannedPage from "./pages/sideBarPages/PlannedPage";
import ImportantPage from "./pages/sideBarPages/ImportantPage";
import AssignedPage from "./pages/sideBarPages/AssignedPage";
import WorkPage from "./pages/sideBarPages/WorkPage";
import PersonalPage from "./pages/sideBarPages/PersonalPage";
import HousePage from "./pages/sideBarPages/HousePage";
import SocialPage from "./pages/sideBarPages/SocialPage";
import CompletedPage from "./pages/sideBarPages/CompletedPage";
import ProjectPage from "./pages/sideBarPages/ProjectPage";
import TrashPage from "./pages/sideBarPages/TrashPage";
import FriendPage from "./pages/sideBarPages/FriendPage";
import EditTask from "./features/edit-task/EditTask";
import Spinner from "./utils/Spinner";

import UserProfile from "./pages/profile/UserProfile";
import EditProfile from "./pages/profile/EditProfile";
import PendingTaskPage from "./pages/sideBarPages/PendingTaskPage";

function App() {
  // const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigate("signup");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center  h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className={`font-sans flex justify-center items-center  w-screen h-screen shadow overflow-auto `}
    >
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="edit-profile" element={<EditProfile />} />

        <Route
          path="layout"
          element={user ? <AppLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<TodayPage />} />
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
          <Route path="pending" element={<PendingTaskPage />} />
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
          {/* </Route> */}
        </Route>
      </Routes>
    </div>
  );
}
export default App;
