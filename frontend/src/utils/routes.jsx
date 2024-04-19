import { useContext } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  useLocation,
} from "react-router-dom";

import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import Home from "../pages/Home";
import MainLayout from "../components/MainLayout";
import Post from "../pages/Post";
import { UserContext } from "./userModeContext";

function PrivateRouter({ children }) {
  const location = useLocation();
  const { isReady, user } = useContext(UserContext);

  if (isReady) {
    if (!user) {
      if (location.pathname === "/create") return <Navigate to={"/"} />;
    } else {
      return children;
    }
  }
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="/page/:pageNum" element={<Home />} />
      <Route path="search" element={<Home />} />
      <Route
        path="create"
        element={
          <PrivateRouter>
            <CreatePost />
          </PrivateRouter>
        }
      />
      <Route path="post/:id" element={<Post />} />
      <Route path="edit/:id" element={<EditPost />} />
    </Route>
  )
);
