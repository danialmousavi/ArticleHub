export type ArticleType = {
  id: string;
  title: string;
  content: string;
  image: string;
  categoryId: string;
  author: string;
  createdAt: string;
};
export type ArticleCommentType = {
  id: string;
  content:string
  articleId: string
  author: string
  createdAt: string
};
