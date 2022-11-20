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
      <h1 className='absolute top-[5%] left-1/2 -translate-x-1/2 xs:text-[6vw] tracking-wider text-gray-300'>Social Experiment</h1>
      <div className='w-full h-[100vh] bg-zinc-900'>
        <Signup signup={signup} setSignup={() => setSignup(!signup)} />
        <Login signup={signup} setSignup={() => setSignup(!signup)}
          resetPassword={resetPassword} setResetPassword={() => setResetPassword(!resetPassword)} />
      </div>
      <BiAtom className=' xs:bottom-[15%] sm:bottom-[15%] lg:bottom-[20%] xl:bottom-[10%] 2xl:bottom-[7%] 
                        xs:text-[20vw] md:text-[15vw] 
          absolute left-1/2 -translate-x-1/2 
        text-white-milk atom-animation' />
    </div>
  );
}