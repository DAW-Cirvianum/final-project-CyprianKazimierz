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

function App() {
  return (
    <>
    
    <Routes>
     {/*Google Sign in */}
     <Route path="google-callback" element={<GoogleCallback/>}/>
     <Route path="complete-profile" element={<CompleteProfile/>}/>

      {/* Rutas públicas */}
      <Route element={<PublicRoute />}>
  <Route path="/home" element={<GuestLayout />}>
   <Route index element={<Main />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="verify" element={<Verify/>}/>
   
  </Route>
</Route>


      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route element={<UserLayout />}>
         <Route index element={<Main />} />
          <Route path="/" element={<Main />} />
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
