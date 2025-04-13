import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import SignupPage, { action as createAccountAction } from "./pages/SignupPage";
import AppLayout from "./ui/appLayout";

import LoginPage, { loader as userLoader } from "./pages/LoginPage";
import Error from "./utils/Error";
import AddNewTask, { action as addTaskAction } from "./ui/navBarUI/AddNewTask";
import NotificationPage from "./pages/sideBarPages/NotificationPage";
import SettingsPage from "./pages/navBarPages/SettingsPage";
import ProgressPage from "./pages/navBarPages/ProgressPage";
import MenuPage from "./pages/navBarPages/MenuPage";
import HelpPage from "./pages/navBarPages/HelpPage";
import TodayPage from "./pages/sideBarPages/TodayPage";
import PlannedPage from "./pages/sideBarPages/PlannedPage";
import ImportantPage from "./pages/sideBarPages/ImportantPage";
import AssignedPage from "./pages/sideBarPages/AssignedPage";
import TaskPage from "./pages/sideBarPages/TaskPage";
import WorkPage from "./pages/sideBarPages/WorkPage";
import PersonalPage from "./pages/sideBarPages/PersonalPage";
import HousePage from "./pages/sideBarPages/HousePage";
import SocialPage from "./pages/sideBarPages/SocialPage";
import CompletedPage from "./pages/sideBarPages/CompletedPage";
import TrashPage from "./pages/sideBarPages/TrashPage";
import FriendPage from "./pages/sideBarPages/FriendPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    action: createAccountAction,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: userLoader,
    errorElement: <Error />,
  },

  {
    path: "/layout",
    element: <AppLayout />,
    children: [
      {
        index: "/layout/today",
        element: <TodayPage />,
      },
      {
        path: "/layout/today",
        element: <TodayPage />,
      },
      {
        path: "/layout/planned",
        element: <PlannedPage />,
      },
      {
        path: "/layout/important",
        element: <ImportantPage />,
      },
      {
        path: "/layout/assigned",
        element: <AssignedPage />,
      },
      {
        path: "/layout/task",
        element: <TaskPage />,
      },
      {
        path: "/layout/work",
        element: <WorkPage />,
      },
      {
        path: "/layout/personal",
        element: <PersonalPage />,
      },
      {
        path: "/layout/house",
        element: <HousePage />,
      },
      {
        path: "/layout/social",
        element: <SocialPage />,
      },
      {
        path: "/layout/completed",
        element: <CompletedPage />,
      },
      {
        path: "/layout/trash",
        element: <TrashPage />,
      },
      {
        path: "/layout/friend",
        element: <FriendPage />,
      },
      { path: "/layout/notification", element: <NotificationPage /> },
      {
        path: "/layout/settings",
        element: <SettingsPage />,
      },
      {
        path: "/layout/progress",
        element: <ProgressPage />,
      },
      {
        path: "/layout/help",
        element: <HelpPage />,
      },
      {
        path: "/layout/menu",
        element: <MenuPage />,
      },
      {
        path: "/layout/new-task",
        element: <AddNewTask />,
        action: addTaskAction,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="font-sans flex justify-center items-center  w-screen h-screen shadow overflow-auto ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
