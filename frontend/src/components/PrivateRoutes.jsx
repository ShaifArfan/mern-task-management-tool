import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoutes ({})  {
  const {auth} = useAuth();

  if(auth === undefined) return "loading...";

  return auth === true ? <Outlet /> : <Navigate to='/auth' />
}

export default PrivateRoutes;