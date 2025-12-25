import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./auth/PrivateRoute";
import PublicRoute from "./PublicRoute";
import UserLayout from "./layout/UserLayout";
import Posts from "./components/Posts";
import GuestLayout from "./layout/GuestLayout";
import Register from "./pages/Register";
import './css/index.css'

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
  </Route>
</Route>


      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route element={<UserLayout />}>
         <Route index element={<Posts />} />
          <Route path="/" element={<Posts />} />
          <Route path="logout"/>
        </Route>
      </Route>

    </Routes>
    </>
  );
}

export default App;
