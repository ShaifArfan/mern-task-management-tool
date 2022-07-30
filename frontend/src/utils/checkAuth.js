import axios from 'axios';

export default async () => {
  try {
    const res = await axios.get('/api/auth/is_logged_in');
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
