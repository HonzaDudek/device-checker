export interface User {
  id: number;
  type: "user" | "admin";
  login: string;
  name: string;
  token: string;
}
