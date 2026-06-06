import { API_URL } from '../../utils/config';
import { getToken } from '../../utils/secureStorage';

export type ArticleCommentType = {
  id: string;
  content: string;
  articleId: string;
  author: string;
  createdAt: string;
};

type GetArticleCommentsResponse = {
  success: boolean;
  message: string;
  data: ArticleCommentType[] | null;
};

type CreateCommentResponse = {
  success: boolean;
  message: string;
  data: ArticleCommentType | null;
};

// دریافت کامنت‌های یک مقاله
export const getArticleComments = async (id: string): Promise<GetArticleCommentsResponse> => {
  try {
    const res = await fetch(`${API_URL}/articles/${id}/comments`);
    const data = await res.json();
    
    if (res.status === 200) {
      return {
        success: true,
        message: "اطلاعات با موفقیت دریافت شد",
        data: data,
      };
    } else {
      return {
        success: false,
        message: "مشکلی در دریافت اطلاعات پیش آمده",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error in getArticleComments:", error);
    return {
      success: false,
      message: "خطا در اتصال به سرور",
      data: null,
    };
  }
};

// ایجاد کامنت جدید
export const createComment = async (
  content: string,
  articleId: string
): Promise<CreateCommentResponse> => {
  try {
    const token = await getToken();
    
    if (!token) {
      return {
        success: false,
        message: "برای ثبت کامنت باید وارد شوید",
        data: null,
      };
    }

    const res = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ content, articleId }),
    });

    const data = await res.json();

    if (res.status === 200 || res.status === 201) {
      return {
        success: true,
        message: "کامنت با موفقیت ثبت شد",
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || "مشکلی در ثبت کامنت پیش آمده",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error in createComment:", error);
    return {
      success: false,
      message: "خطا در اتصال به سرور",
      data: null,
    };
  }
};