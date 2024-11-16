import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // Allow access to the home page ("/") without authentication
    if (location.pathname === '/') {
        return <>{children}</>;
    }

    // Redirect to login if not authenticated and not on login/register pages
    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to='/' />;
    }

    // Prevent authenticated users from accessing login or register pages
    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        if (user?.role === "admin") {
            return <Navigate to='/admin/dashboard' />;
        } else {
            return <Navigate to='/' />;
        }
    }

    // Restrict access to admin pages for non-admin users
    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes('admin')) {
        return <Navigate to='/unAuth-page' />;
    }

    // Restrict access to user pages for admin users
    if (isAuthenticated && user?.role === "admin" && location.pathname.includes('user')) {
        return <Navigate to='/admin/dashboard' />;
    }

    return <>{children}</>;
}

// Add prop types validation
CheckAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        role: PropTypes.string
    }),
    children: PropTypes.node
};

export default CheckAuth;
