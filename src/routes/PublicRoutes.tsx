import { Outlet, Navigate } from "react-router-dom";
import { AppSelector } from "../app/store";

function PublicRoutes() {
    const isAuth = AppSelector((state) => state.auth.isAuthorized);

    return (!isAuth  &&  !localStorage.getItem('token')) ? <Outlet /> : <Navigate replace to="/home" />;
}

export default PublicRoutes;