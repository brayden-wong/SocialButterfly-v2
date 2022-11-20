import { useState } from "react";
import { UserIcon, KeyIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { SignupProps } from "./credentials.interface";
import axios from 'axios';

export const Signup = (props: SignupProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState<'password' | 'text'>('password');

  let variable: string = 'hello';
  console.log(variable);

  const handleViewPassword = () => viewPassword === 'password' ? setViewPassword('text') : setViewPassword('password');

  const handleSignUp = () => {

  }

  return (
    <div className={`absolute top-[25%] left-[60%] w-[33vw] h-[20vw] bg-slate-800 rounded-2xl ${props.signup ?
      'translate-y-0 duration-[800ms]' : 'translate-y-[-100vw] duration-[800ms]'}`}>
      <div className='flex justify-center mb-4 w-full items-center h-1/6'>
        <h1 className='relative top-2 py-4 text-5xl text-[#F5F5F5]'>Sign Up</h1>
      </div>
      <form className='relative w-full h-3/4 flex flex-col justify-around '>
        <div className='flex items-center justify-center'>
          <div className='flex justify-center items-center gap-2 w-full' >
            <label className='w-[4vw] text-right text-gray-300 text-md tracking-wider font-semibold'>
              First Name
            </label>
            <div className='flex'>
              <input className='outline-none font-medium w-[10vw] text-gray-300'
                type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFirstName(e.target.value);
                }} />
              <UserIcon className='relative right-0 w-10 text-gray-300' />
            </div>
          </div>
          <div className='flex justify-center items-center gap-2 w-full' >
            <label className='w-[4vw] text-right text-white-milk text-md tracking-wider font-semibold'>
              Last Name
            </label>
            <div className='flex'>
              <input className='outline-none font-medium w-[10vw] text-gray-300'
                type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLastName(e.target.value);
                }} />
              <UserIcon className='relative right-0 w-10 text-white-milk' />
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='flex justify-center items-center gap-2 w-full' >
            <label className='w-[4vw] text-right text-white-milk text-md tracking-wider font-semibold'>
              Password
            </label>
            <div className='flex'>
              <input className='outline-none font-medium w-[9.5vw] text-gray-300'
                type={viewPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }} />
              {viewPassword === 'password' ? <EyeIcon className='absolute  w-5 left-[13.5vw] pt-3.5 text-white-milk' onClick={() => handleViewPassword()} /> : <EyeSlashIcon className='absolute  w-5 left-[13.5vw] pt-3.5 text-white-milk' onClick={() => handleViewPassword()} />}
              <KeyIcon className='relative right-[-2px] w-10 text-white-milk'
              />
            </div>
          </div>
          <div className='flex justify-center gap-2 items-center w-full' >
            <label className='w-[4vw] text-right text-white-milk text-md tracking-wider font-semibold'>
              Email
            </label>
            <div className='flex'>
              <input className='outline-none font-medium w-[10vw] text-gray-300'
                type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }} />
              <EnvelopeIcon className='relative right-[-2px] w-10 text-white-milk' />
            </div>
          </div>
        </div>
        <div className='z-10 flex justify-evenly items-center'>
          <button className='py-2 px-12 text-slate-800 font-semibold 
            bg-teal-400 rounded-md duration-500 hover:text-white-milk 
            hover:bg-teal-600 hover:duration-500'
            onClick={(e: any) => {
              e.preventDefault();
              handleSignUp();
            }}>
            Sign Up
          </button>
          <p className='text-white-milk text-md font-normal cursor-pointer hover:text-slate-300 hover:duration-500 duration-500'
            onClick={() => props.setSignup(!props.signup)}>Have an account? Sign In
          </p>
        </div>
      </form>
    </div>
  )
}