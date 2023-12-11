import { Outlet, Navigate } from "react-router-dom";
import { AppSelector } from "../app/store";

function ProtectedRoutes() {
    const isAuth = AppSelector((state) => state.auth.isAuthorized);

    return (isAuth  ||  localStorage.getItem('token')) ? <Outlet /> : <Navigate replace to="/login" />;
}

export default ProtectedRoutes;