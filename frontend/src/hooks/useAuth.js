import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default () => {
  const [auth, setAuth] = useState();
  const navigate = useNavigate();

  const verifyAuth = async () => {
    try {
      const res = await axios.get('/api/auth/is_logged_in');
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    (
      async () => {
        const data = await verifyAuth();
        setAuth(data);
        if (!data) {
          navigate('/auth');
        }
      }
    )();
  }, [navigate]);

  return { auth };
};
