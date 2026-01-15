import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./auth/PrivateRoute";
import PublicRoute from "./PublicRoute";
import UserLayout from "./layout/UserLayout";
import Main from "./components/Main";
import GuestLayout from "./layout/GuestLayout";
import Register from "./pages/Register";
import Verify from "./pages/Verify"
import Profile from "./pages/Profile";
import './css/index.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleCallback from "./pages/GoogleCallback";
import CompleteProfile from "./pages/CompleteProfile";
import Details from "./pages/Details";
import AddPost from "./pages/AddPost";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from "./pages/NotFound";
import EditPost from "./pages/EditPost";
import FavoritePosts from "./pages/FavoritePosts";

function App() {

  return (
    <>
      <Routes>

        {/*Google Sign in */}
        <Route path="google-callback" element={<GoogleCallback />} />
        <Route path="complete-profile" element={<CompleteProfile />} />

        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/home" element={<GuestLayout />}>
            <Route index element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify" element={<Verify />} />
            <Route path="details/:id" element={<Details />} />

          </Route>
        </Route>

        {/* Private Route */}
        <Route element={<PrivateRoute />}>
          <Route element={<UserLayout />}>
            <Route index element={<Main />} />
            <Route path="/" element={<Main />} />
            <Route path="logout" />
            <Route path="profile" element={<Profile />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="addPost" element={<AddPost />} />
            <Route path="editPost/:id" element={<EditPost />} />
            <Route path="favoritePosts" element={<FavoritePosts/>}/>
          </Route>
        </Route>

        {/*Others paths that does not exists */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/*Component to show toasts */}
      <ToastContainer />
    </>
  );
}

export default App;
