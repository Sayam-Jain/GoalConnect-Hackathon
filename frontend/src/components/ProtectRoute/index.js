import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children, loggedIn, role, allowedRoles }) => {
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectRoute;
