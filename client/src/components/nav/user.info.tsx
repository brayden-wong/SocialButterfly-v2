import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Navigation } from "./nav";

interface Props {
  id: string;
  setId: CallableFunction;
  firstName: string;
  setFirstName: CallableFunction;
  email: string;
  setEmail: CallableFunction;
}

export const GetInfo = (props: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    getUserInformation();
  }, []);

  const getUserInformation = () => {
    const accessToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') as string : navigate('/');
    const refreshToken = localStorage.getItem('refresh_token') ? localStorage.getItem('refresh_token') as string : navigate('/');

    axios.get(`http://localhost:8080/users/getInfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        props.setId(response.data.id);
        props.setFirstName(response.data.first_name)
        props.setEmail(response.data.email);
      })
      .catch(error => console.error(`error: ${error}`));
  }

  return (
    <Navigation name={props.firstName} email={props.email} id={props.id} />
  )
}