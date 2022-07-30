import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Navbar from '../components/nav/Navbar';
import TaskList from '../components/task/TaskList';

function Home() {
  const [userData, setUserData] = useState();

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get('/api/users/me');
      setUserData(data);
    } catch (err) {
      toast('we got error');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!userData || !userData._id) {
    return null;
  }

  return (
    <Layout>
      <Navbar />
      <TaskList />
    </Layout>
  );
}
export default Home;
