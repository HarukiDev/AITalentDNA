import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

// Hook untuk menggunakan konteks autentikasi
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("UseAuthContext must be used inside AuthContextProfider");
  }
  return context;
};
