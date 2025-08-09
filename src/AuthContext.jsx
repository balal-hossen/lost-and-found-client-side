import React, { createContext, useContext } from 'react';

export const Authcontex = createContext(null);

export const useAuth = () => useContext(Authcontex);
