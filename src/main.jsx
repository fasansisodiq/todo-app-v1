import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import { TasksProvider } from "./customHooks/tasks/TasksProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authentication/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <TasksProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TasksProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
