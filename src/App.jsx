import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

// Pages

import AppLayout from "./ui/AppLayout";
import EditTask from "./features/edit-task/EditTask";

// Sidebar Pages
import TodayPage from "./pages/sideBarPages/TodayPage";

// Utils
import Spinner from "./utils/Spinner";
import { dynamicRoutesPath, layoutRoutes, mainRoutes } from "./routes";
import { useAuth } from "./authentication/useAuth";

function App() {
  const [user, error] = useAuthState(auth);

  const { authLoading } = useAuth();

  if (authLoading) {
    return <Spinner />;
  }

  // if (!currentUser) {
  //   return null;
  // }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="font-sans flex justify-center items-center w-screen min-h-screen shadow overflow-auto bg-[#f0f4f3] ">
      <Routes>
        {mainRoutes.map(({ path, element }) => (
          <Route path={path} key={path} element={element} />
        ))}

        <Route
          path="layout"
          element={user ? <AppLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<TodayPage />} />
          {layoutRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {dynamicRoutesPath.map((path) => (
            <Route path={path} key={path} element={<EditTask />} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
// 4. Settings & Actions
// Change Password button
// Notification Preferences
// Theme/Appearance Settings
// Export Data (download tasks as CSV/JSON)
// Connect Calendar (Google/Outlook integration)
// Manage Integrations (Slack, Zapier, etc.)
// 5. Security & Privacy
// Delete Account (already present)
