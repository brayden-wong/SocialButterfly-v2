import { useState } from "react"
import { Login } from "../components/login/Login";
import { GiButterfly } from 'react-icons/gi';
import { Signup } from "../components/login/Signup";

export const Authentication = () => {
  const [signup, setSignup] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  return (
    <div className='bg-zinc-900'>
      <div className='w-[50%] h-[7.5vw] bg-slate-800 rounded-br-[3vw] relative' >
        <h1 className='text-[4vw] tracking-wider text-gray-300 text-center pt-[.5vw]'>Social Propaganda</h1>
      </div>
      <div className='w-[100%] h-[90vh]'>
        <div className="w-[50%] h-[100%] float-left bg-zinc-900">

        </div>
        <div className="w-[50%] h-[100%] float-left bg-zinc-900">
          <Signup signup={signup} setSignup={() => setSignup(!signup)} />
          <Login signup={signup} setSignup={() => setSignup(!signup)}
            resetPassword={resetPassword} setResetPassword={() => setResetPassword(!resetPassword)} />
        </div>
      </div>
    </div>
  );
}