import React from 'react'
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Layout from '../components/Layout';
import classes from './Auth.module.scss';

function Auth() {

  return (
    <Layout>
    <div className={classes.form_container}>
      <Login></Login> 
      <Register></Register>
    </div>
    </Layout>

  )
}

export default Auth