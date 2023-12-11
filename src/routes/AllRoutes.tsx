import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/auth/login/Login";
import Profile from "../features/home/profile/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login/>}/>
        </Route>
        {/* Protected Route */}
        <Route element={<ProtectedRoutes />}>
          <Route index element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;