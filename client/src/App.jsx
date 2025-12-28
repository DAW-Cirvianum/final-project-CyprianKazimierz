import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./auth/PrivateRoute";
import PublicRoute from "./PublicRoute";
import UserLayout from "./layout/UserLayout";
import Posts from "./components/Posts";
import GuestLayout from "./layout/GuestLayout";
import Register from "./pages/Register";
import Verify from "./pages/Verify"
import Profile from "./pages/Profile";
import './css/index.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    
    <Routes>

      {/* Rutas públicas */}
      <Route element={<PublicRoute />}>
  <Route path="/home" element={<GuestLayout />}>
   <Route index element={<Posts />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="verify" element={<Verify/>}/>
  </Route>
</Route>


      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route element={<UserLayout />}>
         <Route index element={<Posts />} />
          <Route path="/" element={<Posts />} />
          <Route path="logout"/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Route>

    </Routes>
     <ToastContainer/>
    </>
  );
}

export default App;
