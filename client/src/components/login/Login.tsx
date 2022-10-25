import { useState, useContext } from "react";
import { UserIcon, KeyIcon } from '@heroicons/react/24/solid';
import { LoginProps } from "./credentials.interface";
import axios from "axios";
import { User } from "../../interfaces/user";
import { UserContext } from "../../App";

export const Login = (props: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);

  const setBlank = () => {
    setEmail('');
    setPassword('');
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setBlank();
      return;
    }

    const response = await axios.post('http://localhost:8080/auth/login', {
      username: email,
      password: password,
    });

    const user = response.data as User;
    console.log(user);
    userContext?.setUser(user);
    console.log('user:', userContext?.user);
  }

  return (
    <div className={`z-[5] absolute top-[25%] left-[55%] w-[40vw] 
            h-[50%] bg-[#D6E6F2] rounded-[1.5vw] shadow-2xl ${props.signup ?
        'translate-y-[100vw] duration-[900ms]' : 'translate-y-0 duration-[900ms]'}`} >
      <div className='relative pt-[5vw]'>
        <div className="text-center h-auto">
          <h1 className="text-[2vw]">Login</h1>
        </div>
        <div className="text-center">
          <div className="input_container">
            <input className="contact_input" type='email' value={email}
              onChange={e => setEmail(e.currentTarget.value)} />
            <label className="placeholder_text">
              <div className='text'>username</div>
              <UserIcon className='loginIcon' />
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
          <div className='credentials pb-2' >
            <p className="float-left cursor-pointer mr-4" onClick={() => props.setSignup(!props.signup)}>
              sign up?
            </p>
            <p className="float-left cursor-pointer" onClick={() => props.setResetPassword(!props.resetPassword)}>
              forgot password?
            </p>
          </div>
          <button className='w-[12vw] py-3 bg-[#D6E6F2] border-2 border-[#000] duration-300 rounded-2xl relative
          hover:bg-[#769FCD] hover:border-[#769FCD] hover:border-2 hover:duration-300' onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>

  )
}