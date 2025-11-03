import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignIn from "./pages/SignIn"
import Feed from "./pages/Feed"
import ProfilePage from "./pages/ProfilePage"
import { Admin0, Admin1 } from "./pages/adminPanel"

// import MatchesPage from "./section/MatchesPage";
// import VisitorPage from "./section/VisitorPage";
// import LikesPage from "./section/LikesPage";
// import ILikePage from "./section/ILikePage";
// import IHatePage from "./section/IHatePage";
// import SettingPage from "./section/SettingPage";

import MatchesPage from "./section/MatchesPage"
import LikesPage from "./section/LikesPage"
import MessagePage from "./section/MessagePage"
import SettingPage from "./pages/Setting"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Sign",
    element: <SignIn />
  },
  {
    path: "/feed",
    element: <Feed />
  },
  {
    path: "/profile/:id",
    element: <ProfilePage />
  }, {
    path: "/admin0",
    element: <Admin0 />
  },
  {
    path: "/admin1",
    element: <Admin1 />
  },
  { path: "/matches", element: <MatchesPage /> },
  // { path: "/visitors", element: <VisitorPage /> },
  { path: "/likes", element: <LikesPage /> },
  { path: "/message", element: <MessagePage /> },
  { path: "/settings", element: <SettingPage /> },
])

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App


// section/
// ├─ MatchesPage.jsx
// ├─ VisitorPage.jsx
// ├─ LikesPage.jsx
// ├─ ILikePage.jsx
// ├─ IhatePage.jsx
// ├─ SettingPage.jsx