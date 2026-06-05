// src/context/MainContext.tsx
import { createContext, useState, useContext, useEffect } from "react";
import { saveToken, getToken, removeToken } from "../secureStorage";
import { validateToken } from "../../services/auth/AuthLogin";

type MainContextProviderProps = {
  children: React.ReactNode;
};

type UserType = {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
};

type MainContextType = {
  isLogin: boolean;
  user: UserType | null;
  isLoading: boolean;
  loginUser: (user: UserType, token: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  updateUser: (user: UserType) => void;
  validateUserToken: () => Promise<boolean>;
};

export const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainContextProvider = ({ children }: MainContextProviderProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // بررسی وضعیت لاگین در شروع برنامه
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      
      if (token) {
        // ولیدیت توکن با سرور
        const isValid = await validateUserToken();
        console.log(isValid);
        if (!isValid) {
          // توکن نامعتبر است
          await logoutUser();
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateUserToken = async (): Promise<boolean> => {
    try {
      const response = await validateToken();
      console.log("response",response);
      if (response.success && response.data) {
        setUser(response.data);
        setIsLogin(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  };

  const loginUser = async (userData: UserType, token: string) => {
    try {
      await saveToken(token);
      setIsLogin(true);
      setUser(userData);
    } catch (error) {
      console.error("Error in loginUser:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await removeToken();
      setIsLogin(false);
      setUser(null);
    } catch (error) {
      console.error("Error in logoutUser:", error);
      throw error;
    }
  };

  const updateUser = (userData: UserType) => {
    setUser(userData);
  };

  return (
    <MainContext.Provider
      value={{
        isLogin,
        user,
        isLoading,
        loginUser,
        logoutUser,
        updateUser,
        validateUserToken,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

// هوک سفارشی برای استفاده راحت از context
export const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};