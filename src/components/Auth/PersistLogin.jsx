import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import LoadingSpinner from "../../placeholders/LoadingScreen";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        // console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  /* useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`AT: ${auth?.accessToken}`);
  }, [isLoading]);
*/
  return (
    <React.Fragment>
      {isLoading ? <LoadingSpinner /> : <Outlet />}
    </React.Fragment>
  );
};

export default PersistLogin;
