import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  localStorage.removeItem("user");
  setIsAuthenticated(false);
  navigate("/");
};
export default Logout;
