import { API_URL } from "../../utils/config";
import { ArticleType } from "../../utils/types/Article";
type GetArticlesResponse = {
  success: boolean;
  message: string;
  data: ArticleType[] | null;
};
export const getArticles = async (): Promise<GetArticlesResponse> => {
  try {
    const res = await fetch(`${API_URL}/articles`);
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
