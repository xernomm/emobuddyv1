import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import useAuth from "./useAuth";
const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});

    try {
      const response = await axios("/user/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      //console.error(error);
    }
  };
  return logout;
};

export default useLogout;
