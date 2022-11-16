import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserIcon, KeyIcon } from '@heroicons/react/24/solid';
import { LoginProps } from "./credentials.interface";
import axios from "axios";
import { User } from "../../interfaces/user";
import { UserContext } from '../../context/user.context';

export const Login = (props: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const setBlank = () => {
    setEmail('');
    setPassword('');
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setBlank();
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: email,
        password: password,
      });
      const user = response.data as User;
      localStorage.setItem('access_token', user.access_token);
      localStorage.setItem('refresh_token', user.refresh_token);
      navigate('/dashboard');
    } catch (error: any) {
      setBlank();
    }
  }

  //FIX USER LOGIN PAGE FORM THING

  return (
    <div className={`relative top-[15%] left-[25%] w-[25vw] h-[20vw] bg-slate-800 rounded-2xl shadow ${props.signup ?
      'translate-y-[100vw] duration-[800ms]' : 'translate-y-0 duration-[800ms]'}`}>
      <div className='flex justify-center w-full items-center h-1/3 z-10'>
        <h1 className='z-10 relative py-4 text-[2.5vw] text-[#F5F5F5]'>Sign In</h1>
      </div>
      <form className='pb-4 relative w-full h-2/3 flex flex-col justify-around'>
        <div className='flex items-center justify-center bg-pink-900'>
          <label className='w-[4vw] bg-blue-300 text-white-milk tracking-wider text-md font-semibold'>
            Username
          </label>
          <div className='flex'>
          <input className='outline-none font-medium
                  w-full text-gray-300' type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }} />
              <UserIcon className='relative right-0 w-10 text-gray-300' />
          </div>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <label className='w-[4vw] text-white-milk text-md tracking-wider font-semibold'>
            Password
          </label>
          <div className='flex'>
            <input className='outline-none font-medium
                w-[10vw] text-gray-300' type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }} />
            <KeyIcon className='relative mx-0 right-0 w-10 text-white-milk' />
          </div>
        </div>
        <div className='flex justify-evenly items-center'>
          <button className='py-2 px-6 text-slate-700 font-semibold bg-teal-400 rounded-md duration-300 
              hover:text-white-milk hover:bg-teal-600 hover:duration-300'
            onClick={(e: any) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Sign In
          </button>
          <p className='text-white-milk text-lg font-semibold'>
            <span className='mr-6 cursor-pointer hover:text-slate-300 hover:duration-400 duration-300'
              onClick={() => props.setSignup(!props.signup)}>Sign Up?</span>
            <a className='hover:text-slate-300 hover:duration-400 duration-300' href="">Forgot Password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}