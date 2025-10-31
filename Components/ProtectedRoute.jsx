import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
        return <Navigate
        to ="/login"
        replace 
        state={{ fromProtectedRoute: true, from: location.pathname }}
        />;
    }

    return children;
};

export default ProtectedRoute;