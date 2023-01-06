import { useState } from "react"
import { Login } from "../components/login/Login";
import { BiAtom } from 'react-icons/bi';
import { Signup } from "../components/login/Signup";

export const Authentication = () => {
  //change this back to false            |
  const [signup, setSignup] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);

  return (
    <div className='bg-zinc-900'>
      <h1 className='absolute top-[5%] left-1/2 -translate-x-1/2 xs:text-[6vw] tracking-wider text-gray-300'>Social Butterfly</h1>
      <div className='w-full h-[100vh] bg-zinc-900'>
        <Signup signup={signup} setSignup={() => setSignup(!signup)} />
        <Login signup={signup} setSignup={() => setSignup(!signup)}
          resetPassword={resetPassword} setResetPassword={() => setResetPassword(!resetPassword)} />
      </div>
    </div>
  );
}