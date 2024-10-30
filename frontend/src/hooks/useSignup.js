import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  // Fungsi untuk menangani pendaftaran pengguna baru
  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));

      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return { signup, isLoading, error };
};
