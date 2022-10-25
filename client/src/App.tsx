import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authentication } from "./pages/Authentication";
import { User } from './interfaces/user';

export const UserContext = React.createContext<{user: User | null, setUser: CallableFunction} | null>(null);

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user: user, setUser: (e:any) => {
        setUser(e.value);
      }}} >
        <Routes>
          <Route path='/' element={<Authentication />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
