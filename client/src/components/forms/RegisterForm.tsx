import { useState } from "react";
import axios from 'axios';

interface Props {
  signup: boolean;
  setSignup: CallableFunction;
}

export const RegisterForm = (props: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filled, setFilled] = useState(false);

  const onSignUp = async() => {
    if(checkBlank()) {
      setBlank();
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users/register', {
        user: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        }
      });
      if(response.status === 201) 
        props.setSignup(false);
      
    } catch (error) {
      setBlank();
      setFilled(false);
    }

  }

  const checkBlank = () => {
    if(firstName === '' || lastName === '' || email === '' || password === '') return true;
    return false;
  }

  const setBlank = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className={`w-[800px] bg-zinc-900 ${props.signup ? '-translate-x-1/2 duration-700 ease' : 'translate-x-[125%] duration-700 ease'}`}>
      <div className='bg-slate-800 px-4 py-3 rounded-xl box-border'>
        <label htmlFor="email" className='block text-slate-300 text-sm mx-1'>Email</label>
        <input id='email' className='w-full box-border mx-1 p-0 bg-inherit text-white-milk outline-none border-none 
          text-[18px]' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type='email' />
      </div>
      <section className='w-full flex justify-between gap-2 my-2'>
        <div className='bg-slate-800 px-3 py-4 rounded-xl box-border w-full'>
          <label htmlFor="firstName" className='block text-slate-300 text-sm mx-1'>First Name</label>
          <input id='firstName' className='w-full box-border mx-1 p-0 bg-inherit text-white-milk outline-none border-none 
          text-[18px]' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} type='text' />
        </div>
        <div className='bg-slate-800 px-3 py-4 rounded-xl box-border w-full'>
          <label htmlFor="lastName" className='block text-slate-300 text-sm mx-1'>Last Name</label>
          <input id='lastName' className='w-full box-border mx-1 p-0 bg-inherit text-white-milk outline-none border-none 
          text-[18px]' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} type='text' />
        </div>
      </section>
      <div className='bg-slate-800 px-4 py-3 rounded-xl box-border'>
        <label htmlFor="password" className='block text-slate-300 text-sm mx-1'>Password</label>
        <input id='password' className='w-full box-border mx-1 p-0 bg-inherit text-white-milk outline-none border-none 
          text-[18px]' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type='password' />
      </div>
      <button className='w-full mt-2 font-semibold bg-teal-600 px-3 py-4 rounded-[10px] hover:bg-teal-500 duration-300 hover:duration-300'
        onClick={() => onSignUp()}>
        Sign Up
      </button>
      <div className='flex justify-center items-center mt-1'>
        <p className='cursor-pointer text-slate-300' onClick={() => props.setSignup(!props.signup)}>Have an account? Sign In</p>
      </div>
    </div>
  )
}