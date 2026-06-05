
import { API_URL } from "../../utils/config";
import { getToken, saveToken } from "../../utils/secureStorage";
import { LoginType, SuccessLogin } from "../../utils/types/Auth";

type LoginResponse = {
  success: boolean;
  data?: SuccessLogin;
  error?: string;
};

type ValidateTokenResponse = {
  success: boolean;
  message: string;
  data?: {
      id: string;
      username: string;
      email: string;
      role: string;
      createdAt: string;
    };
  };
export const AuthLogin = async (data: LoginType): Promise<LoginResponse> => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    const dataResponse = await res.json();
   
    if (res.status === 200) {
      if(dataResponse.token){
        await saveToken(dataResponse.token)
      }
      return { success: true, data: dataResponse as SuccessLogin };
    } else {
      return { success: false, error: dataResponse.message };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Network error - unable to connect to server" };
  }
};


export const validateToken = async (): Promise<ValidateTokenResponse> => {
  try {
    const token = await getToken();
    
    if (!token) {
      return {
        success: false,
        message: "توکن یافت نشد",
      };
    }

    const res = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await res.json();
    
    if (res.status === 200) {
      return {
        success: true,
        message: "توکن معتبر است",
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || "توکن نامعتبر است",
      };
    }
  } catch (error) {
    console.error("Validate token error:", error);
    return {
      success: false,
      message: "خطا در اتصال به سرور",
    };
  }
};