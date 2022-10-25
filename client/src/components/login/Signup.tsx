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
    <div className={`z-[5] absolute top-[18%] left-[55%] w-[40vw] h-[60%] p-[2vw] bg-[#D6E6F2] 
      rounded-[1.5vw] shadow-2xl ${props.signup ? 'translate-y-0 duration-[900ms]'
        : 'translate-y-[-100vw] duration-[900ms]'}`}>
      <div className="text-center h-auto scroll_view">
        <h1 className="text-[2vw]">Sign Up</h1>
      </div>
      <div className="text-center">
        <div className="input_container">
          <input className="contact_input" type='text' value={firstName}
            onChange={e => setFirstName(e.currentTarget.value)} />
          <label className="placeholder_text">
            <div className='text'>first name</div>
            <UserIcon className='loginIcon' />
          </label>
        </div>
        <div className="input_container">
          <input className="contact_input" type='text' value={lastName}
            onChange={e => setLastName(e.currentTarget.value)} />
          <label className="placeholder_text">
            <div className='text'>last name</div>
            <UserIcon className='loginIcon' />
          </label>
        </div>
        <div className="input_container">
          <input className="contact_input" type='text' value={email}
            onChange={e => setEmail(e.currentTarget.value)} />
          <label className="placeholder_text">
            <div className='text'>email</div>
            <EnvelopeIcon className='loginIcon' />
          </label>
        </div>
        <div className="input_container">
          <input className="contact_input" type='password' value={password}
            onChange={e => setPassword(e.currentTarget.value)} />
          <label className="placeholder_text">
            <div className='text'>password</div>
            <KeyIcon className='loginIcon' />
          </label>
        </div>
        <div className="input_container">
          <input className="contact_input" type='password' value={confirmPassword}
            onChange={e => setConfirmPassword(e.currentTarget.value)} />
          <label className="placeholder_text">
            <div className='text'>confirm password</div>
            <KeyIcon className='loginIcon' />
          </label>
        </div>
        <div className='credentials' >
          <p className="float-left cursor-pointer mr-4" onClick={() => props.setSignup(!props.signup)}>
            already have an account?
          </p>
        </div>
        <button className='w-[12vw] py-3 bg-[#D6E6F2] border-2 border-[#000] duration-300 rounded-2xl relative
          hover:bg-[#769FCD] hover:border-[#769FCD] hover:border-2 hover:duration-300' onClick={() => handleSignUp}>Sign Up</button>
      </div>
    </div>
  )
}