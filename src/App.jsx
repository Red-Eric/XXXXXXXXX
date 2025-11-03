import { RouterProvider , createBrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignIn from "./pages/SignIn"
import Feed from "./pages/Feed"
import ProfilePage from "./pages/ProfilePage"
import { Admin0, Admin1 } from "./pages/adminPanel"


const router = createBrowserRouter([
  {
    path:"/",
    element: <Home></Home>
  },
  {
    path: "/Login",
    element : <Login/>
  },
  {
    path:"/Sign",
    element : <SignIn/>
  },
  {
    path : "/feed",
    element : <Feed/>
  },
  {
    path : "/profile/:id",
    element : <ProfilePage/>
  },{
    path : "/admin0",
    element : <Admin0/>
  },
  {
    path : "/admin1",
    element : <Admin1/>
  }
])

const App = ()=>{
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App


// pages/
// ├─ MatchesPage.jsx
// ├─ VisitorPage.jsx
// ├─ LikesPage.jsx
// ├─ ILikePage.jsx
// ├─ IhatePage.jsx
// ├─ SettingPage.jsx