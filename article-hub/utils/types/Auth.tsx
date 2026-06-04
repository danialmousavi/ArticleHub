export type LoginType = {
  username: string;
  password: string;
};
export type SuccessLogin = {
  message: string
  token: string
  user: {
    id: string
    username: string
    email: string
    role: string
    createdAt: string
  };
};
export type FaildLogin = {
  message: string

};
