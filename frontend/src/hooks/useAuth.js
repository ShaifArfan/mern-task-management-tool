import { useContext } from "react";
import AuthContext from "../context/Auth";

const useAuth = () => {
  const  { auth, verifyAuth } = useContext(AuthContext);
  return { auth, verifyAuth };
}

export default useAuth;