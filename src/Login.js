import React, { useState , createContext  , useContext , useReducer} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthProvider';
import './Login.css';

const Login = () => {
    //const main = useContext(AuthContext);
    const { dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const Navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
      const response = await axios.post("https://api-staging-v2.sploot.space/api/v2/auth/signin", {
        username:"testassignment@gmail.com",
        password : "highlysecure",
      }).then (response=> {console.log(response);
      const Token = response.data.data.data.authToken;
      console.log(JSON.stringify(Token));
      //setAuthToken(Token);
      // AuthContext.setAuthToken(Token);
      // main(Token);
      
      //dispatch(setAuthToken(Token));
      
      //setToken(Token);
      dispatch({ type: 'SET_AUTH_TOKEN', payload: Token});
      dispatch({ type: 'SET_USERNAME', payload: username });
      Navigate("/blog");  }) .catch((err) => console.log(err));
      
    }



  const handleEmailChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="form-group"> 
      <h1 className="login"> Login Form</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={username}
          onChange={handleEmailChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
    
  );

};

export default Login;
