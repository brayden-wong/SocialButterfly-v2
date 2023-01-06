import { useState } from "react";
import { LoginForm } from "../components/forms/LoginForm";
import { RegisterForm } from "../components/forms/RegisterForm";

export const Credentials = () => {
  const [signup, setSignup] = useState(false);

  return (
    <div className='bg-white h-full flex justify-center items-center'>
      <LoginForm signup={signup} setSignup={() => setSignup(!signup)} />
      <RegisterForm signup={signup} setSignup={() => setSignup(!signup)}  />
    </div>
  )
}