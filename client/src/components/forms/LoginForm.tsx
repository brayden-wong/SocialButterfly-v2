import { useState } from "react";
import axios from 'axios';
import { User } from "./interfaces/user.interface";
import { useNavigate } from "react-router-dom";

interface Props {
  signup: boolean;
  setSignup: CallableFunction;
}

export const LoginForm = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [correctCredentials, setCorrectCredentials] = useState(true);
  const navigate = useNavigate();

  const onSignIn = async () => {
    if (checkBlank()) {
      setBlank();
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: email,
        password: password
      });
      const user = response.data as User;
      localStorage.setItem('access_token', user.access_token);
      localStorage.setItem('refresh_token', user.refresh_token);
      navigate('/dashboard');
    } catch (error) {
      setBlank();
      setCorrectCredentials(false);
    }
  }

  const checkBlank = () => {
    if (email === '' || password === '') return true;
    return false;
  }

  const setBlank = () => {
    setEmail('');
    setPassword('');
  }

  return (
    <div className={`w-[800px] bg-zinc-900 ${props.signup ? '-translate-x-[125%] duration-700 ease' : 'translate-x-1/2 duration-700 ease'}`}>
      <div className='bg-slate-800 px-4 py-3 rounded-xl box-border'>
        <label htmlFor="email" className='block text-slate-300 text-sm mx-1'>Email</label>
        <input id='email' className='w-full box-border mx-1 p-0 bg-inherit text-white-milk outline-none border-none 
          text-[18px]' value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type='email' />
      </div>
      <div className='bg-slate-800 px-4 py-3 rounded-xl box-border mt-2'>
        <label htmlFor="password" className='block text-slate-300 text-sm mx-1'>Password</label>
        <input id='password' className='w-full box-border mx-1 p-0 bg-inherit text-white-milk outline-none border-none 
          text-[18px]' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type='password' />
      </div>
      <button className='w-full mt-2 font-semibold bg-teal-600 px-3 py-4 rounded-[10px] hover:bg-teal-500 duration-300 hover:duration-300'
        onClick={() => { onSignIn() }}>
        Sign In
      </button>
      <div className='flex justify-center items-center gap-8 mt-1'>
        <p className='cursor-pointer text-slate-300' onClick={() => props.setSignup(!props.signup)}>Don't have an account? Sign Up</p>
        <p className='cursor-pointer text-slate-300'>Forgot Password?</p>
      </div>
    </div>
  )
}