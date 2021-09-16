import React from "react";

type Action =
  | { type: "show"; payload: { type: string; label: string } }
  | { type: "hide"; payload: null };
type Dispatch = (action: Action) => void;
type State = { snackbar: { type: string; label: string } | null };
type SnackbarProviderProps = { children: React.ReactNode };

const SnackbarContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const userReducer = (
  state: any,
  action: { type: any; payload: { type: string; label: string } | null }
) => {
  switch (action.type) {
    case "show": {
      return { snackbar: action.payload };
    }
    case "hide": {
      return { snackbar: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [state, dispatch] = React.useReducer(userReducer, { snackbar: null });
  const value = { state, dispatch };
  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = React.useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar has to be used within SnackBArProviderr");
  }
  return context;
};
export { SnackbarProvider, useSnackbar };
