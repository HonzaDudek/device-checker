import { useEffect } from "react";
import { Template } from "../../Templates/Template";
import { userLogin } from "../../../Services/userLogin.service";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../../Context/UserContext";
import { useSnackbar } from "../../../Context/SnackbarContext";
import { Button, Card, Snackbar, TextField } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Controller, useForm } from "react-hook-form";
import { useStyles } from "./Login.styles";

interface ILoginData {
  login: string;
  password: string;
}

export const LoginPage = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();
  const history = useHistory();
  const { dispatch } = useUserContext();
  const { state: snackBarState, dispatch: dispatchSnackbar } = useSnackbar();
  const classes = useStyles();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser !== null) {
      const parsedLocalUser = JSON.parse(localUser);
      dispatch({ type: "login", payload: parsedLocalUser });
      history.replace("catalog");
    }
  });

  const onSubmit = (data: ILoginData) => {
    onLoginSubmit(data.login, data.password);
  };

  const onError = () => console.log(errors);

  const onLoginSubmit = (name: string, password: string) => {
    userLogin({
      login: name,
      password: password,
    }).then((response) => {
      if (response?.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "login", payload: response.data });
        history.replace("catalog");
      } else {
        dispatchSnackbar({
          type: "show",
          payload: {
            type: "error",
            label: "Invalid login information provided",
          },
        });
        setTimeout(() => {
          dispatchSnackbar({ type: "hide", payload: null });
        }, 3000);
      }
    });
  };

  return (
    <Template>
      <Card className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Controller
            name="login"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="login"
                label="Login"
                value={field.value || ""}
                error={!!errors?.name}
                helperText={errors?.name ? errors.name.message : null}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="password"
                label="Heslo"
                value={field.value || ""}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
              />
            )}
          />
          <Button type="submit">Submit</Button>
          {snackBarState && (
            <Snackbar open={snackBarState.snackbar !== null}>
              <MuiAlert severity="error">
                {snackBarState.snackbar?.label}
              </MuiAlert>
            </Snackbar>
          )}
        </form>
      </Card>
    </Template>
  );
};
