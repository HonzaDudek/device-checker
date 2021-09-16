import { User } from "./User";

export interface IDevice {
  id: string;
  code: string;
  os: string;
  vendor: string;
  model: string;
  osVersion?: string;
  image?: string;
  borrowed?: {
    user: User;
    date: number;
  };
}

export enum OS {
  ANDROID = "ANDROID",
  WINDOWS = "WINDOWS",
  IOS = "IOS",
}

export enum VENDORS {
  SAMSUNG = "SAMSUNG",
  APPLE = "APPLE",
  HUAWEI = "HUAWEI",
  ASUS = "ASUS",
  LENOVO = "LENOVO",
  XIAOMI = "XIAOMI",
  LG = "LG",
  VODAFONE = "VODAFONE",
  ACER = "ACER",
  MOTOROLA = "MOTOROLA",
}
