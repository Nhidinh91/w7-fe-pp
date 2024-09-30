import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  return isAuthenticated ? (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/add-job">Add Job</a>
        <button className="logout" onClick={()=>handleLogout()}>Log out</button>
      </div>
    </nav>
  ) : (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/add-job">Add Job</a>
        <Link to={"/login"}>Log in</Link>
        <Link to={"/signup"}>Sign up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
