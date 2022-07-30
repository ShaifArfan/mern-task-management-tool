import { Navigate } from 'react-router-dom';
import checkAuth from './checkAuth';
// import useAuth from '../hooks/useAuth';

export default (err) => {
  const { auth } = checkAuth();
  // const navigate = useNavigate();

  if (err.response.status === 401) {
    if (!auth) {
      Navigate('/auth');
    }
  } else {
    console.log(err);
  }
};
