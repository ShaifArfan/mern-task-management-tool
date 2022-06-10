import React from 'react'
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Auth() {
  const {verifyAuth} = useAuth();
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try{
      await axios.post('/api/auth/login', { email, password });
      await verifyAuth();
      navigate('/');
    }catch(err){
      console.log(err);
      verifyAuth();
    }

    console.log(email, password);
  }
  return (
    <>
      <h1>login</h1>
      <Link to="/">Home</Link>
      <form onSubmit={login}>
      <label htmlFor="email">
        email: 
        <input name="email" type="email" placeholder="email" required />
      </label>
      <br />
      <label htmlFor="password">
        password: 
        <input name="password" type="password" placeholder="password" required />
      </label>
      <br />
      <button type='submit'>login</button>
      </form>
    </>

  )
}

export default Auth