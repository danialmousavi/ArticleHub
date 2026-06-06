import { API_URL } from "../../utils/config";
import { ArticleType } from "../../utils/types/Article";
import { CategoryType } from "../../utils/types/Category";

type GetCategoriesResponse = {
  success: boolean;
  message: string;
  data: CategoryType[] | null;
};
type GetCategoryArticles = {
  success: boolean;
  message: string;
  data: ArticleType[] | null;
};
export const getCategories = async (): Promise<GetCategoriesResponse> => {
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

export const getCategoryArticles = async (id:string): Promise<GetCategoryArticles> => {
  try {
    const res = await fetch(`${API_URL}/categories/${id}/articles`);
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
