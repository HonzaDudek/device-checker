import axios from "axios";
import { IAddDeviceFormType } from "../Components/Pages/AddDevice/AddDevice";

const borrowDevice = async (deviceId: string, userToken: string) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/phones/${deviceId}/borrow`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": userToken,
        },
      }
    );
    return res;
  } catch (err: any) {
    return err.response;
  }
};

const returnDevice = async (deviceId: string, userToken: string) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/phones/${deviceId}/return`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": userToken,
        },
      }
    );
    return res;
  } catch (err: any) {
    return err.response;
  }
};

const addDevice = async (form: IAddDeviceFormType, userToken: string) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/phones`,
      { ...form },
      {
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": userToken,
        },
      }
    );
    return res;
  } catch (err: any) {
    return err.response;
  }
};

const getDevices = async (userToken: string) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/phones`, {
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": userToken,
      },
    });
    return res;
  } catch (err: any) {
    return err.response;
  }
};

const deviceService = {
  addDevice: addDevice,
  borrowDevice: borrowDevice,
  getDevices: getDevices,
  returnDevice: returnDevice,
};

export default deviceService;
