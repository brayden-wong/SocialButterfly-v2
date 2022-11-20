import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserIcon, KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { LoginProps } from "./credentials.interface";
import axios from "axios";
import { User } from "../../interfaces/user";
import { UserContext } from '../../context/user.context';

export const Login = (props: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState<'text' | 'password'>('password');
  const navigate = useNavigate();

  const setBlank = () => {
    setEmail('');
    setPassword('');
  }

  const handleViewPassword = () => viewPassword === 'password' ? setViewPassword('text') : setViewPassword('password');

  console.log(props.signup);

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
  
  return (
    <div className={`absolute sign_in bg-slate-800 rounded-3xl overflow-y-hidden ${props.signup ? 'transform_sign_in_right' : 'transform_sign_in_left' }`}>
      <h1 className='lg:text-[4vw] xs:text-[8vw] flex justify-center items-center py-4 tracking-wider text-gray-300 text-center'>Sign In</h1>
      <div className='relative xs:top-[10%] md:top-[5%] lg:-top-[10%] 2xl:top-0'>
        <div className='flex flex-col xs:h-[30vw] xs:justify-between md:justify-center md:gap-20 lg:gap-12 pt-5 items-center
          2xl:justify-start'>
          <div className='flex justify-center items-end text-right gap-4 w-full'>
            <label className='w-30 text-white-milk tracking-wider xs:text-[3.5vw] lg:text-[1vw] font-semibold'>
              <UserIcon className='xs:w-20 lg:w-12' />
            </label>
            <input id='username' className='outline-none xs:text-[3.5vw] lg:text-[1.5vw] font-normal w-7/12 text-slate-300 input_fields_login' 
              placeholder='username' type='text' />
          </div>
          <div className='flex justify-center items-end text-right gap-4 w-full'>
            <label className='w-30 text-white-milk tracking-wider xs:text-[3.5vw] lg:text-[1vw] font-semibold'>
              <KeyIcon className='xs:w-20 lg:w-12' />
            </label>
            <input className='outline-none xs:text-[3.5vw] lg:text-[1.5vw] font-normal w-7/12 text-slate-300 input_fields_login' 
              placeholder='password' type={viewPassword} />
            {viewPassword === 'password' ? <EyeIcon className='xs:w-12 lg:w-6 absolute xs:right-[17.5%] lg:right-[16%] pb-1.5 text-white-milk' 
              onClick={() => handleViewPassword()}/> : <EyeSlashIcon className='xs:w-12 lg:w-6 absolute xs:right-[17.5%] lg:right-[16%] pb-1.5 text-white-milk'
              onClick={() => handleViewPassword()}/>}
          </div>
          <div className='grid grid-cols-4 xs:gap-8 lg:gap-4 text-white-milk'>
            <p className='relative col-start-2 xs:text-[2vw] lg:text-[1.5vw]' onClick={() => props.setSignup(props.signup)}>Sign Up?</p>
            <p className='relative col-start-3 col-span-4 xs:text-[2vw] lg:text-[1.5vw]'>Forgot Password?</p>
          </div>
        </div>
      </div>
        <button id='sign_in' className='absolute font-medium bottom-0 w-full lg:py-4 2xl:py-2 xs:py-8 lg:text-[1.5vw] xs:text-[3vw] bg-teal-400 duration-[.5s] 
          ease-in-out hover:ease-in-out hover:bg-teal-600 hover:duration-[.5s] rounded'>
          Sign In
        </button>
    </div>
  );
}