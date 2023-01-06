import { useState } from 'react';
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RenderCards } from '../components/events/RenderCards';
import { Search } from '../components/forms/Search';
import { GetInfo } from "../components/nav/user.info";
import { UserContext } from "../context/user.context";

export const Dashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  useEffect(() => {
    try {
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');

      if (access_token && refresh_token) {
        userContext.access_token = access_token;
        userContext.refresh_token = refresh_token;
      }
    } catch (error) {
      return navigate('/');
    }
  }, []);

  return (
    <div className='grid grid-cols-2 bg-zinc-900'>
      <div className='w-full h-screen'>
        <div className='absolute left-8 top-[15%]'>
          <GetInfo id={id} setId={setId} firstName={firstName} setFirstName={setFirstName} 
            email={email} setEmail={setEmail} />
        </div>
      </div>
      <div className='w-full'>
        <Search searchText={searchText} setSearchText={setSearchText} expanded={expanded} setExpanded={setExpanded} />
        <RenderCards searchText={searchText} setSearchText={setSearchText} email={email}  expanded={expanded} />
      </div>
    </div>
  );
}