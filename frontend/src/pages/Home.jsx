import React from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

function Home() {
  const {verifyAuth} = useAuth();
  const logout = async () => {
    await axios.get('/api/auth/logout');
    verifyAuth(); 
  }
  return (
    <>
      <h1>Home</h1>
      <button onClick={logout}>logout</button>
    </>
  )
}
export default Home