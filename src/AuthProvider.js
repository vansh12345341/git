// AuthContext.js

import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
  authToken: '',
  username: '',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH_TOKEN':
      return {
        ...state,
        authToken: action.payload,
      };
      case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


