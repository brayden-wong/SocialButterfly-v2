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
    <div className={`absolute sign_up bg-slate-800 rounded-3xl ${props.signup ? 'transform_sign_up_right' : 'transform_sign_up_left' }`}>
      <h1 className='lg:text-[4vw] xs:text-[8vw] flex justify-center items-center py-4 tracking-wider text-gray-300 text-center'>Sign Up</h1>
      <div className='relative xs:top-[10%] sm:top-[5%] lg:-top-[15%] 2xl:top-0'>
        <div className='flex flex-col h-[45vw] xs:justify-around md:justify-center md:gap-20 lg:gap-12 pt-5 items-center
          2xl:justify-start'>
          <div className='flex justify-center items-end text-right gap-4 w-full'>
            <label className='text-white-milk'>
              <UserIcon className='xs:w-20 lg:w-12' />
            </label>
            <input className='outline-none xs:text-[3.5vw] lg:text-[1.5vw] font-normal w-7/12 text-slate-300 input_fields_login' 
              placeholder='First Name' type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
          </div>
          <div className='flex justify-center items-end text-right gap-4 w-full'>
            <label className='text-white-milk'>
              <UserIcon className='xs:w-20 lg:w-12' />
            </label>
            <input className='outline-none xs:text-[3.5vw] lg:text-[1.5vw] font-normal w-7/12 text-slate-300 input_fields_login' 
              placeholder='Last Name' type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} />
          </div>
          <div className='flex justify-center items-end text-right gap-4 w-full'>
            <label className='text-white-milk'>
              <EnvelopeIcon className='xs:w-20 lg:w-12' />
            </label>
            <input className='outline-none xs:text-[3.5vw] lg:text-[1.5vw] font-normal w-7/12 text-slate-300 input_fields_login' 
              placeholder='Email' type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
          </div>
          <div className='flex justify-center items-end text-right gap-4 w-full'>
            <label className='w-30 text-white-milk tracking-wider xs:text-[3.5vw] lg:text-[1vw] font-semibold'>
              <KeyIcon className='xs:w-20 lg:w-12' />
            </label>
            <input className='outline-none xs:text-[3.5vw] lg:text-[1.5vw] font-normal w-7/12 text-slate-300 input_fields_login' 
              placeholder='Password' type={viewPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            {viewPassword === 'password' ? <EyeIcon className='xs:w-12 lg:w-6 absolute xs:right-[17.5%] lg:right-[18%] pb-1.5 text-white-milk' 
              onClick={() => handleViewPassword()}/> : <EyeSlashIcon className='xs:w-12 lg:w-6 absolute xs:right-[17.5%] lg:right-[18%] pb-1.5 text-white-milk'
              onClick={() => handleViewPassword()}/>}
          </div>
          <div className='text-white-milk cursor-pointer'>
            <p className='xs:text-[2.5vw] lg:text-[1.5vw]' onClick={() => props.setSignup(props.signup)}>Already have an account? Sign In</p>
          </div>
        </div>
      </div>
        <button className='absolute font-medium bottom-0 w-full lg:py-4 2xl:py-2 xs:py-8 lg:text-[1.5vw] xs:text-[3vw] bg-teal-400 duration-[.5s] 
          ease-in-out hover:ease-in-out hover:bg-teal-600 hover:duration-[.5s] rounded'>
          Sign Up
        </button>
    </div>
  )

  //     < div className = {`absolute top-[25%] left-[60%] w-[33vw] h-[20vw] bg-slate-800 rounded-2xl ${props.signup ?
  //       'translate-y-0 duration-[800ms]' : 'translate-y-[-100vw] duration-[800ms]'}`}>
  //       <div className='flex justify-center mb-4 w-full items-center h-1/6'>
  //         <h1 className='relative top-2 py-4 text-5xl text-[#F5F5F5]'>Sign Up</h1>
  //       </div>
  //       <form className='relative w-full h-3/4 flex flex-col justify-around '>
  //         <div className='flex items-center justify-center'>
  //           <div className='flex justify-center items-center gap-2 w-full' >
  //             <label className='w-[4vw] text-right text-gray-300 text-md tracking-wider font-semibold'>
  //               First Name
  //             </label>
  //             <div className='flex'>
  //               <input className='outline-none font-medium w-[10vw] text-gray-300'
  //                 type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  //                   setFirstName(e.target.value);
  //                 }} />
  //               <UserIcon className='relative right-0 w-10 text-gray-300' />
  //             </div>
  //           </div>
  //           <div className='flex justify-center items-center gap-2 w-full' >
  //             <label className='w-[4vw] text-right text-white-milk text-md tracking-wider font-semibold'>
  //               Last Name
  //             </label>
  //             <div className='flex'>
  //               <input className='outline-none font-medium w-[10vw] text-gray-300'
  //                 type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  //                   setLastName(e.target.value);
  //                 }} />
  //               <UserIcon className='relative right-0 w-10 text-white-milk' />
  //             </div>
  //           </div>
  //         </div>
  //         <div className='flex justify-center'>
  //           <div className='flex justify-center items-center gap-2 w-full' >
  //             <label className='w-[4vw] text-right text-white-milk text-md tracking-wider font-semibold'>
  //               Password
  //             </label>
  //             <div className='flex'>
  //               <input className='outline-none font-medium w-[9.5vw] text-gray-300'
  //                 type={viewPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  //                   setPassword(e.target.value);
  //                 }} />
  //               {viewPassword === 'password' ? <EyeIcon className='absolute  w-5 left-[13.5vw] pt-3.5 text-white-milk' onClick={() => handleViewPassword()} /> : <EyeSlashIcon className='absolute  w-5 left-[13.5vw] pt-3.5 text-white-milk' onClick={() => handleViewPassword()} />}
  //               <KeyIcon className='relative right-[-2px] w-10 text-white-milk'
  //               />
  //             </div>
  //           </div>
  //           <div className='flex justify-center gap-2 items-center w-full' >
  //             <label className='w-[4vw] text-right text-white-milk text-md tracking-wider font-semibold'>
  //               Email
  //             </label>
  //             <div className='flex'>
  //               <input className='outline-none font-medium w-[10vw] text-gray-300'
  //                 type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  //                   setEmail(e.target.value);
  //                 }} />
  //               <EnvelopeIcon className='relative right-[-2px] w-10 text-white-milk' />
  //             </div>
  //           </div>
  //         </div>
  //         <div className='z-10 flex justify-evenly items-center'>
  //           <button className='py-2 px-12 text-slate-800 font-semibold 
  //             bg-teal-400 rounded-md duration-500 hover:text-white-milk 
  //             hover:bg-teal-600 hover:duration-500'
  //             onClick={(e: any) => {
  //               e.preventDefault();
  //               handleSignUp();
  //             }}>
  //             Sign Up
  //           </button>
  //           <p className='text-white-milk text-md font-normal cursor-pointer hover:text-slate-300 hover:duration-500 duration-500'
  //             onClick={() => props.setSignup(!props.signup)}>Have an account? Sign In
  //           </p>
  //         </div>
  //       </form>
  //     </div >
}