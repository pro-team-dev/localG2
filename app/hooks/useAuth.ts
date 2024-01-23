import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/authProvider";
import { router } from "expo-router";
import { getData, getValueFor, save, saveData } from "../../utils/storage";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const authToken = "dfdfdfd";
      setUser({ username, email: "" });
      setJwtToken(authToken);
      await save("token", authToken);
      await saveData("userInfo", { username, email: "" });
      setIsLoading(false);
      router.push("/(home)/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const signin = async (username: string, password: string) => {
    try {
      if (username === "" || password === "") {
        throw new Error("Please fill in all fields");
      }

      setUser({ username, email: "" });
      const authToken = "dfdfdfd";
      setJwtToken(authToken);
      await save("token", authToken);
      await saveData("userInfo", { username, email: "" });
      router.push("/(home)/");
    } catch (error) {
      console.error("Signin error:", error);
      setError("Signin failed. Please check your credentials.");
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setJwtToken(undefined);
      setUser(undefined);
      await save("token", "");
      await saveData("userInfo", "");
      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setError("Logout failed. Please try again.");
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = await getValueFor("token");
      const userInfo = await getData("userInfo");

      if (!userToken || !userInfo) {
        setIsLoading(false);
        return;
      }

      setUser(userInfo);
      setJwtToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.error("IsLoggedIn error:", error);
      setError("Error checking login status.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return {
    user,
    login,
    signin,
    logout,
    isLoading,
    error,
    clearError: () => setError(undefined),
  };
};

export default useAuth;
