import React from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/nav/Navbar';
import TaskList from '../components/task/TaskList';

function Home() {
  return (
    <Layout>
      <Navbar />
      <TaskList />
    </Layout>
  );
}
export default Home;
