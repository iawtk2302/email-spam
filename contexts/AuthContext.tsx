"use client";
import { LoginFormValues } from "@/interface/Form";
import User from "@/interface/User";
import { signIn } from "@/services/AuthService";
import { isTokenExpired } from "@/utils/Jwt";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextData = {
  user: User | null;
  login: (data: LoginFormValues) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export interface DataStorage {
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await signIn(data);
      const { user } = response;
      console.log(user.access);
      const dataStorage: DataStorage = {
        user: user,
        isAuthenticated: true,
      };
      localStorage.setItem("dataStorage", JSON.stringify(dataStorage));
      localStorage.setItem("accessToken", user.access);
      setUser(user);
      setIsAuthenticated(true);
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("dataStorage");
    localStorage.removeItem("accessToken");
    router.push("/");
  };
  useEffect(() => {
    const dataStorage = localStorage.getItem("dataStorage");

    if (dataStorage !== null) {
      const data: DataStorage = JSON.parse(dataStorage);
      if (isTokenExpired(data.user.access)) {
        logout();
        return;
      }
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
