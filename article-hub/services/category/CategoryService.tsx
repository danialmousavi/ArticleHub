import { API_URL } from "../../utils/config";
import { CategoryType } from "../../utils/types/Category";

type GetArticlesResponse = {
  success: boolean;
  message: string;
  data: CategoryType[] | null;
};
export const getCategories = async (): Promise<GetArticlesResponse> => {
  try {
    const res = await fetch(`${API_URL}/categories`);
    const data = await res.json();
    if (res.status == 200) {
      return {
        success: true,
        message: "اطلاعات با موفقیت دریافت شد",
        data: data,
      };
    } else {
      return {
        success: false,
        message: "مشکلی در دریافت اطلاعات پیش امده",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "خطا در اتصال به سرور",

      data: null,
    };
  }
};