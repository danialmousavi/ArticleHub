
import { API_URL } from "../../utils/config";
import { saveToken } from "../../utils/secureStorage";
import { LoginType, SuccessLogin } from "../../utils/types/Auth";

type LoginResponse = {
  success: boolean;
  data?: SuccessLogin;
  error?: string;
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


