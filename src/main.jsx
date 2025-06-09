import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import { TasksProvider } from "./customHooks/tasks/TasksProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authentication/AuthProvider.jsx";
import { NotificationProvider } from "./customHooks/notification/NotificationProvider.jsx";
import { DarkModeProvider } from "./customHooks/DarkModeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <NotificationProvider>
            <TasksProvider>
              <DarkModeProvider>
                <App />
              </DarkModeProvider>
            </TasksProvider>
          </NotificationProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
