import React, { useState } from 'react';

const AuthContext = React.createContext({
  authToken: null,
  setAuthToken: () => {},
});

function AuthContextProvider(props) {
  const [authToken, setAuthToken] = useState(null);

  function handleSetAuthToken(newAuthToken) {
    setAuthToken(newAuthToken);
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: handleSetAuthToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export  default {AuthContextProvider , AuthContext };
