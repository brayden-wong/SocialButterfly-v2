import { useState } from "react"
import { Login } from "../components/login/Login";
import { GiButterfly } from 'react-icons/gi';
import { Signup } from "../components/login/Signup";

export const Authentication = () => {
  const [signup, setSignup] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  return (
    <div className='bg-[#F7FBFC]'>
      <div className='w-[50%] h-[7.5vw] bg-[#D6E6F2] rounded-br-[3vw] shadow-2xl relative' >
        <h1 className='text-[4vw] text-center pt-[.5vw]'>Social Butterfly</h1>
      </div>
      <div className='w-[100%] h-[90vh]'>
        <div className="w-[50%] h-[100%] float-left bg-[#F7FBFC]">
          <GiButterfly className='butterfly_animation' />
        </div>
        <div className="w-[50%] h-[100%] float-left bg-[#F7FBFC]">
          <Signup signup={signup} setSignup={() => setSignup(!signup)} />
          <Login signup={signup} setSignup={() => setSignup(!signup)}
            resetPassword={resetPassword} setResetPassword={() => setResetPassword(!resetPassword)} />
        </div>
      </div>
    </div>
  );
}