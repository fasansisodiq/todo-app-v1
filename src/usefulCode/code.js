import { useState } from "react";
const [tittle, setTittle] = useState('reading')
const [assignee, setAssignee] = useState('sodia')
const [dueDate, setDueDate] = useState('2025/05/02')
const [priority, setPriority] = useState('yes')
const [description, setDescription] = useState('exam reading according to exam times table')
const [taskClass, setTaskClass] = useState('work')

function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // You can pass formData as a fetch body directly:
    fetch('http://localhost:9000/tasks', { method:'POST', body: formData });
    // You can generate a URL out of it, as the browser does by default:
    console.log(new URLSearchParams(formData).toString());
    // You can work with it as a plain object.
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson); // (!) This doesn't include multiple select values
    // Or you can get an array of name-value pairs.
    console.log([...formData.entries()]);
  }
   case 'changed': {
      const index = draft.findIndex(t =>
        t.id === action.task.id
      );
      draft[index] = action.task;
      break;
    }
    // const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <WelcomePage />,
//   },
//   {
//     path: "/signup",
//     element: <SignupPage />,
//     action: createAccountAction,
//     errorElement: <Error />,
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//     // loader: userLoader,
//     // errorElement: <Error />,
//   },

//   {
//     path: "/layout",
//     element: <AppLayout />,
//     children: [
//       {
//         index: "/layout/today",
//         element: <TodayPage />,
//       },
//       {
//         path: "/layout/today",
//         element: <TodayPage />,
//       },
//       {
//         path: "/layout/planned",
//         element: <PlannedPage />,
//       },
//       {
//         path: "/layout/important",
//         element: <ImportantPage />,
//       },
//       {
//         path: "/layout/assigned",
//         element: <AssignedPage />,
//       },
//       {
//         path: "/layout/project",
//         element: <TaskPage />,
//       },
//       {
//         path: "/layout/work",
//         element: <WorkPage />,
//       },
//       {
//         path: "/layout/personal",
//         element: <PersonalPage />,
//       },
//       {
//         path: "/layout/house",
//         element: <HousePage />,
//       },
//       {
//         path: "/layout/social",
//         element: <SocialPage />,
//       },
//       {
//         path: "/layout/completed",
//         element: <CompletedPage />,
//       },
//       {
//         path: "/layout/trash",
//         element: <TrashPage />,
//       },
//       {
//         path: "/layout/friend",
//         element: <FriendPage />,
//       },
//       { path: "/layout/notification", element: <NotificationPage /> },
//       {
//         path: "/layout/settings",
//         element: <SettingsPage />,
//       },
//       {
//         path: "/layout/progress",
//         element: <ProgressPage />,
//       },
//       {
//         path: "/layout/help",
//         element: <HelpPage />,
//       },
//       {
//         path: "/layout/menu",
//         element: <MenuPage />,
//       },
//       {
//         path: "/layout/task/new",
//         element: <AddNewTask />,
//         // action: addNewTaskAction,
//         errorElement: <Error />,
//       },
//       {
//         path: "/layout/task/:taskId",
//         element: <Task />,
//         loader: taskLoader,
//         errorElement: <Error />,
//       },
//       {
//         path: "/layout/task/:taskId/edit",
//         element: <EditTask />,
//         // loader: editTaskLoader,
//         // action: editTaskAction,
//         // errorElement: <Error />,
//       },
//     ],
//   },
// ]);

// function App() {
//   return (
//     <div className="font-sans flex justify-center items-center  w-screen h-screen shadow overflow-auto ">
//       <RouterProvider router={router} />
//     </div>
//   );
// }