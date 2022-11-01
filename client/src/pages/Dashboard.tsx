import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../components/nav/nav";
import { UserContext } from "../context/user.context";

export const Dashboard = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  useEffect(() => {
    try {
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');
      if(access_token && refresh_token) {
        userContext.access_token = access_token;
        userContext.refresh_token = refresh_token;
        console.log(access_token, '\n', refresh_token);
      }
    } catch (error) {
      return navigate('/');
    }
  }, []);

  return (
    <div className='dashboard'>
      <Navigation />
    </div>
  );
}