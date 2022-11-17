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
    <div className={`absolute login_form bg-slate-800 rounded-xl shadow overflow-y-hidden ${props.signup ?
      'translate-y-full duration-[900ms]' : 'translate-y-0 duration-[900ms]'}`}>
      <h1 className='text-[4vw] flex justify-center items-center py-4 tracking-wider text-gray-300 text-center'>Sign In</h1>
      <div className='relative top-16 grid grid-cols-1'>
        <div className='space-y-8'>
          <div className='flex justify-center items-end gap-2 bg-full w-full'>
            <label className='w-30 text-white-milk tracking-wider text-md font-semibold'>
              Username
            </label>
            <input id='username' className='outline-none text-md font-normal w-1/2 text-slate-300' type='text' />
          </div>
          <div className='flex justify-center items-end w-full gap-2'>
            <label className='w-30 text-white-milk tracking-wider text-md font-semibold'>
              Password
            </label>
            <input className='outline-none text-md font-normal w-1/2 text-slate-300' type={viewPassword} />
          </div>
          <div className='grid grid-cols-4 text-sm text-white-milk' >
          {/* <div className='flex justify-between ml-[%] w-1/2  gap-2'> */}
            <p className='relative pl-4 col-start-2'>Sign Up?</p>
            <p className='relative pl-4 col-start-3 col-span-4 '>Forgot Password?</p>
          </div>
        </div>
      </div>
      <div id='block' className='absolute bottom-0 bg-teal-400 w-full'>
        <button id='sign_in' className='relative w-full py-4 bg-teal-400 duration-[.5s] ease-in-out hover:ease-in-out hover:bg-teal-600 hover:duration-[.5s] text-xl rounded'>
          Sign In
        </button>
        {/* <div id='background' className='absolute w-full bg-teal-400 bg-red-500'>hello</div> */}
      </div>
      {/* <div className='absolute left-1/2 bg-red-300 w-[1px] h-[100%]'></div> */}
    </div>
  )
  // <div className={`absolute top-[25%] left-[60%] w-[30vw] h-[20vw] bg-slate-800 rounded-2xl shadow ${props.signup ?
  //   'translate-y-[100vw] duration-[800ms]' : 'translate-y-0 duration-[800ms]'}`}>
  //   <div className='flex justify-center w-full items-center h-1/3 z-10'>
  //     <h1 className='z-10 relative py-4 text-[2.5vw] text-[#F5F5F5]'>Sign In</h1>
  //   </div>
  //   <form className='pb-4 relative w-full h-2/3 flex flex-col justify-around'>
  //     <div className='flex items-center justify-center'>
  //       <label className='w-[7vw] text-white-milk tracking-wider text-md font-semibold'>
  //         Username
  //       </label>
  //       <div className='flex'>
  //         <input className='outline-none font-medium w-[10vw] text-gray-300 tracking-wide' 
  //           type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  //             setEmail(e.target.value);
  //           }} />
  //         <UserIcon className='relative right-0 w-10 text-white-milk' />
  //       </div>
  //     </div>
  //     <div className='flex flex-row items-center justify-center'>
  //       <label className='w-[7vw] text-white-milk text-md tracking-wider font-semibold'>
  //         Password
  //       </label>
  //       <div className='flex'>
  //         <input className='outline-none font-medium w-[10vw] text-gray-300' 
  //           type={viewPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  //             setPassword(e.target.value);
  //           }} />
  //         {viewPassword === 'password' ? <EyeIcon className='absolute w-5 pt-4 right-[6.5vw] text-white-milk cursor-pointer'
  //           onClick={() => handleViewPassword()}/> : <EyeSlashIcon className='absolute w-5 pt-4 right-[6.5vw] text-white-milk cursor-pointer' onClick={() => handleViewPassword()} />}
  //         <KeyIcon className='relative mx-0 right-[-2px] w-10 text-white-milk' />
  //       </div>
  //     </div>
  //     <div className='flex justify-evenly items-center'>
  //       <button className='py-2 px-6 text-slate-700 font-semibold bg-teal-400 rounded-md duration-300 
  //           hover:text-white-milk hover:bg-teal-600 hover:duration-300'
  //         onClick={(e: any) => {
  //           e.preventDefault();
  //           handleLogin();
  //         }}
  //       >
  //         Sign In
  //       </button>
  //       <p className='text-white-milk text-lg font-semibold'>
  //         <span className='mr-6 cursor-pointer hover:text-slate-300 hover:duration-400 duration-300'
  //           onClick={() => props.setSignup(!props.signup)}>Sign Up?</span>
  //         <a className='hover:text-slate-300 hover:duration-400 duration-300' href="">Forgot Password?</a>
  //       </p>
  //     </div>
  //   </form>
  // </div>
}