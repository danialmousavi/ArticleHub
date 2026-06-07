import { API_URL } from "../../utils/config";

type RegisterResponse = {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
  };
};
export const AuthRegister= async (data: {
  username: string;
  password: string;
  email: string;
  role: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await res.json();

    if (res.status === 201) {
      return { success: true, data: dataResponse };
    } else {
      return { success: false, error: dataResponse.message };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Network error - unable to connect to server",
    };
  }
};
