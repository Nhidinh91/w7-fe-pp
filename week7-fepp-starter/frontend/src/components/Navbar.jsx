import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <span>{user.email}</span>
            <Link to="/add-job">Add Job</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
