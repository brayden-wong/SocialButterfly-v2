import React from 'react';
import { User } from '../interfaces/user';

export const UserContext = React.createContext<User>({ access_token: '', refresh_token: '' });