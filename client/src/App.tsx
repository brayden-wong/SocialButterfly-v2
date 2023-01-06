import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authentication } from "./pages/Authentication";
import { User } from './interfaces/user';
import { UserContext } from './context/user.context';
import { Dashboard } from './pages/Dashboard';
import { Credentials } from './pages/Credentials';

const App = () => {
  const userContext = UserContext;
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ access_token: '', refresh_token: '' }} >
        <Routes>
          <Route path='/' element={<Credentials />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
