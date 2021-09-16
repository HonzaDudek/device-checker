import React from "react";
import { IDevice } from "../Models/Device";

type Action = { type: "loadDevices"; payload: IDevice[] };
type Dispatch = (action: Action) => void;
type State = { devices: IDevice[] };
type DevicesProviderProps = { children: React.ReactNode };

const DevicesContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const devicesReducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "loadDevices": {
      return { devices: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const DevicesProvider = ({ children }: DevicesProviderProps) => {
  const [state, dispatch] = React.useReducer(devicesReducer, { devices: [] });
  const value = { state, dispatch };
  return (
    <DevicesContext.Provider value={value}>{children}</DevicesContext.Provider>
  );
};

const useDevicesContext = () => {
  const context = React.useContext(DevicesContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
export { DevicesProvider, useDevicesContext };
