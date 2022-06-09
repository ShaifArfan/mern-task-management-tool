export default  (user) => {
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
  }
  return userData;
}