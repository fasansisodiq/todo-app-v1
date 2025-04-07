import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import SignupPage, { action as createAccountAction } from "./pages/SignupPage";
import AppLayout from "./ui/appLayout";
import TodayPage from "./pages/TodayPage";
import ImportantPage from "./pages/ImportantPage";
import PlannedPage from "./pages/PlannedPage";
import AssignedPage from "./pages/AssignedPage";
import TaskPage from "./pages/TaskPage";
import WorkPage from "./pages/WorkPage";
import PersonalPage from "./pages/PersonalPage";
import HousePage from "./pages/HousePage";
import SocialPage from "./pages/SocialPage";
import CompletedPage from "./pages/CompletedPage";
import TrashPage from "./pages/TrashPage";
import FriendPage from "./pages/FriendPage";
import LoginPage, { loader as userLoader } from "./pages/LoginPage";
import Error from "./utils/Error";
import AddNewTask, {
  action as addTaskAction,
} from "./features/add-task/AddNewTask";
import NotificationPage from "./pages/NotificationPage";
import ProgressPage from "./pages/ProgressPage";
import HelpPage from "./pages/HelpPage";
import MenuPage from "./pages/MenuPage";
import SettingsPage from "./pages/SettingsPage";

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

    // <div className="font-sans flex justify-center items-center  w-screen h-screen shadow overflow-auto ">
    //   <RouterProvider router={router} />
    // </div>
  );
}

export default App;
