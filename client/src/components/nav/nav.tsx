import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  name: string;
  email: string;
}

export const Navigation = (props: Props) => {
  const navigate = useNavigate();

  return (
    <ul className='group flex gap-4 items-center bg-gray-500 hidden'>
      <li className='cursor-pointer hover:underline'>{props.name}</li>
      <li className='cursor-pointer opacity-0 hover:underline group-hover:opacity-100 group-hover:duration-300'
        onClick={() => console.log('My Events')}>My Events</li>
      <li className='cursor-pointer opacity-0 hover:underline group-hover:opacity-100 group-hover:duration-300'
        onClick={() => console.log('Preferences')}>Preferences</li>
    </ul>
  )
}