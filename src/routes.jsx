// Sidebar Pages
import AssignedPage from "./pages/sideBarPages/AssignedPage";
import CompletedPage from "./pages/sideBarPages/CompletedPage";
import FriendPage from "./pages/sideBarPages/FriendPage";
import HousePage from "./pages/sideBarPages/HousePage";
import ImportantPage from "./pages/sideBarPages/ImportantPage";
import SharedTaskPage from "./pages/sideBarPages/SharedTaskPage";
import PendingTaskPage from "./pages/sideBarPages/PendingTaskPage";
import PersonalPage from "./pages/sideBarPages/PersonalPage";
import PlannedPage from "./pages/sideBarPages/PlannedPage";
import ProjectPage from "./pages/sideBarPages/ProjectPage";
import SocialPage from "./pages/sideBarPages/SocialPage";
import TodayPage from "./pages/sideBarPages/TodayPage";
import TrashPage from "./pages/sideBarPages/TrashPage";
import WorkPage from "./pages/sideBarPages/WorkPage";

// Navbar/Menu Pages
import HelpPage from "./pages/navBarPages/help-center/HelpPage";
import FilterPage from "./pages/navBarPages/menu/filterPage/FilterPage";
import MenuPage from "./pages/navBarPages/menu/MenuPage";
import ProgressPage from "./pages/navBarPages/progress/ProgressPage";
import SettingsPage from "./pages/settings/SettingsPage";

// Utility Pages
import AddNewTask from "./features/add-task/AddNewTask";
import WelcomePage from "./pages/welcome/WelcomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/navBarPages/menu/ProfilePage/profile/UserProfile";
import EditProfile from "./pages/navBarPages/menu/ProfilePage/profile/EditProfile";
import NotificationPage from "./pages/notification/NotificationPage";

const layoutRoutes = [
  // Sidebar
  { path: "today", element: <TodayPage /> },
  { path: "planned", element: <PlannedPage /> },
  { path: "important", element: <ImportantPage /> },
  { path: "assigned", element: <AssignedPage /> },
  { path: "project", element: <ProjectPage /> },
  { path: "work", element: <WorkPage /> },
  { path: "personal", element: <PersonalPage /> },
  { path: "house", element: <HousePage /> },
  { path: "social", element: <SocialPage /> },
  { path: "completed", element: <CompletedPage /> },
  { path: "trash", element: <TrashPage /> },
  { path: "pending", element: <PendingTaskPage /> },
  { path: "friend", element: <FriendPage /> },
  { path: "notification", element: <NotificationPage /> },
  { path: "share", element: <SharedTaskPage /> },

  // Navbar/Menu
  { path: "settings", element: <SettingsPage /> },
  { path: "progress", element: <ProgressPage /> },
  { path: "help", element: <HelpPage /> },
  { path: "menu", element: <MenuPage /> },
  { path: "filter", element: <FilterPage /> },

  // Utility
  { path: "task/new", element: <AddNewTask /> },
];

const mainRoutes = [
  { path: "/", element: <WelcomePage /> },
  { path: "signup", element: <SignupPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "profile", element: <UserProfile /> },
  { path: "edit-profile", element: <EditProfile /> },
];
const dynamicRoutesPath = [
  ":taskId",
  "today/:taskId",
  "important/:taskId",
  "pending/:taskId",
  "assigned/:taskId",
  "project/:taskId",
  "work/:taskId",
  "personal/:taskId",
  "house/:taskId",
  "friend/:taskId",
  "social/:taskId",
  "completed/:taskId",
  "planned/:taskId",
  "filter/:taskId",
  "share/:taskId",
];
export { layoutRoutes, mainRoutes, dynamicRoutesPath };
