import { useAuthContext } from "./useAuthContext";

// Hook untuk menangani proses logout pengguna
const useLogout = () => {
  const { dispatch } = useAuthContext()

  // Fungsi untuk melakukan logout
  const logout = () => {
    localStorage.removeItem('user')

    dispatch({type: 'LOGOUT'})
  }

  return { logout }
};

export default useLogout;

