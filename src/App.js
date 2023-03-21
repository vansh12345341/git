import React , { useState} from 'react'
import { Routes , Route} from 'react-router-dom';
import Login from './Login';
import Blog from './Blog';
import { AuthProvider } from './AuthProvider';


const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [username , setUsername] = useState(null);

  return (
      <AuthProvider value={{ authToken, setAuthToken , username , setUsername}}>
           <Routes >
      <Route path="/" element={<Login />} />
      <Route path="/blog" element ={<Blog />} />
    </Routes>
   
      </AuthProvider>
      
     
  
  )
}

export default App
