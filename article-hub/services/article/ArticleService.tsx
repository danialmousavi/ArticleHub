import { API_URL, BASE_URL } from "../../utils/config";
import { ArticleCommentType, ArticleType } from "../../utils/types/Article";
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

type GetArticlesDetailResponse = {
  success: boolean;
  message: string;
  data: ArticleType | null;
};
export const getArticleDetail = async (
  articleId: string,
): Promise<GetArticlesDetailResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/articles/${articleId}`);
    const data = await response.json();
    return {
      success: true,
      message: "اطلاعات با موفقیت دریافت شد",
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: "خطا در اتصال به سرور",
      data: null,
    };
  }
};


