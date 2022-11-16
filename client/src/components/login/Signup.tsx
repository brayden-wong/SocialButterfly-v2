import { useState } from "react";
import { UserIcon, KeyIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { SignupProps } from "./credentials.interface";
import axios from 'axios';

export const Signup = (props: SignupProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.log('passwords do not match');
    }


  }

  return (
    <div className={`absolute top-[25%] left-[60%] w-[30vw] h-[20vw] bg-slate-800 rounded-2xl ${props.signup ?
      'translate-y-0 duration-[800ms]' : 'translate-y-[-100vw] duration-[800ms]'}`}>
      <div className='flex justify-center mb-4 w-full items-center h-1/6'>
        <h1 className='relative top-2 py-4 text-5xl text-[#F5F5F5]'>Sign Up</h1>
      </div>
      <form className='relative w-full h-3/4 flex flex-col justify-around '>
        <div className='flex items-center justify-center'>
          <div className='flex justify-center gap-[.5vw] items-center w-[45%]' >
            <label className='w-[4vw] text-right text-gray-300 text-md tracking-wider font-semibold'>
              First Name
            </label>
            <div className='flex'>
              <input className='outline-none font-medium
                  w-full text-gray-300' type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFirstName(e.target.value);
                }} />
              <UserIcon className='relative right-0 w-10 text-gray-300' />
            </div>
          </div>
          <div className='flex justify-center gap-[.5vw] items-center w-[45%]' >
            <label className='w-[4vw] text-right text-white-milk text-md tracking-wider font-semibold'>
              Last Name
            </label>
            <div className='flex'>
              <input className='outline-none font-medium
                  w-full text-gray-300' type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLastName(e.target.value);
                }} />
              <UserIcon className='relative right-0 w-10 text-white-milk' />
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='flex justify-center gap-[.5vw] items-center w-[45%]' >
            <label className='w-[4vw] text-right text-white-milk text-md tracking-wider font-semibold'>
              Password
            </label>
            <div className='flex'>
              <input className='outline-none font-medium
                  w-full text-gray-300' type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }} />
              <KeyIcon className='relative right-[-2px] w-10 text-white-milk' />
            </div>
          </div>
          <div className='flex justify-center gap-[.5vw] items-center w-[45%]' >
            <label className='w-[4vw] text-right text-white-milk text-md tracking-wider font-semibold'>
              Email
            </label>
            <div className='flex'>
              <input className='outline-none font-medium
                  w-full text-gray-300' type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setConfirmPassword(e.target.value);
                }} />
              <EnvelopeIcon className='relative right-[-2px] w-10 text-white-milk' />
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center gap-12'>
          <button className='py-2 px-12 text-slate-800 font-semibold bg-teal-400 rounded-md duration-300 hover:text-white-milk hover:bg-teal-600 hover:duration-300'>
            Sign Up
          </button>
          <p className='text-white-milk text-lg font-semibold'>
            <span className='mr-6 cursor-pointer hover:text-slate-300 hover:duration-400 duration-300'
              onClick={() => props.setSignup(!props.signup)}>Have an account? Sign In</span>
          </p>
        </div>
      </form>
    </div>
  )
}