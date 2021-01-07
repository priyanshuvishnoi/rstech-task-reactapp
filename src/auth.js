export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null && token.length > 0;
 
};
