import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import Home from "../pages/Home"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import AdminLogin from "../pages/admin/AdminLogin"
import AdminPage from "../pages/admin/AdminPage"
import IdeaDetails from "../pages/admin/IdeaDetails"
import GroupDetails from "../pages/admin/GroupDetails"

const LayOut = () => {
  return(
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/", element: <LayOut/>,
      children: [
        {path: "/", element: <Home/>},
        {path: "login", element: <Login/>},
        {path: "signup", element: <Signup/>},
        {path: "admin", element: <AdminLogin/>},
        {path: "adminpage", element: <AdminPage/>},
        {path: "adminpage/ideadetails/:id", element: <IdeaDetails/>},
        {path: "adminpage/groupdetails/:id", element: <GroupDetails/>},
      ]
  }
])

function Router() {
  return (
    <RouterProvider router={router}/>
  )
}

export default Router