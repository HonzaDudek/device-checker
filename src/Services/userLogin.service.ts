import axios from "axios";

interface LoginType {
  login: string;
  password: string;
}

export const userLogin = async ({ login, password }: LoginType) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      {
        login,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (err: any) {
    return err.response;
  }
};
