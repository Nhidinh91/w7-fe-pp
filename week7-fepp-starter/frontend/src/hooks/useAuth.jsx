import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export const useAuth = () => {
  if (!useContext(AuthContext)) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return useContext(AuthContext);
};
