import React from 'react';
import { useNavigate} from 'react-router-dom';

const Logout = () => {
  const history = useNavigate();

  const handleLogout = () => {
    // Clear the JWT token from localStorage
    localStorage.removeItem('authToken');
    history.push('/login');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
