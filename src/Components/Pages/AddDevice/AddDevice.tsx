import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { Template } from "../../Templates/Template";
import { useEffect } from "react";
import { useUserContext } from "../../../Context/UserContext";
import { OS, VENDORS } from "../../../Models/Device";
import { useHistory } from "react-router-dom";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useSnackbar } from "../../../Context/SnackbarContext";
import { useDevicesContext } from "../../../Context/phonesContext";
import { useStyles } from "./AddDevice.styles";
import MuiAlert from "@material-ui/lab/Alert";
import deviceService from "../../../Services/device.service";

export interface IAddDeviceFormType {
  code: string;
  os: OS;
  vendor: VENDORS;
  osVersion?: string;
  model: string;
  image?: string;
}

export const AddDevicePage = () => {
  const classes = useStyles();
  const { state } = useUserContext();
  const { state: devicesState } = useDevicesContext();
  const history = useHistory();
  const { state: snackBarState, dispatch: dispatchSnackbar } = useSnackbar();
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm();

  const onSubmit = (data: IAddDeviceFormType) => {
    if (state.user) {
      deviceService.addDevice(data, state.user?.token).then((res) => {
        if (res.status === 200) {
          reset({
            code: "",
            vendor: "",
            model: "",
            os: "",
            osVersion: "",
            image: "",
          });
          dispatchSnackbar({
            type: "show",
            payload: {
              type: "success",
              label: "Zařízení úspěšně přidáno",
            },
          });
        }
      });
    }
  };

  const onError = () => console.log(errors);

  const vendor = useWatch({ control, name: "vendor" });
  const system = useWatch({ control, name: "os" });

  useEffect(() => {
    if (state.user?.type !== "admin") {
      history.replace("/catalog");
    }
  }, []);

  const checkUniqueCode = (code: string) => {
    return !devicesState.devices.find((device) => device.code === code);
  };

  return (
    <Template>
      <Card className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Controller
            name="code"
            control={control}
            rules={{
              required: "Toto pole je povinné",
              validate: (code) =>
                checkUniqueCode(code) || "Kód musí být unikátní",
            }}
            render={({ field }) => (
              <TextField
                id="code"
                {...field}
                label={"Kódové označení (Identifikátor)"}
                value={field.value || ""}
                required
                error={!!errors?.code}
                helperText={errors?.code ? errors.code.message : null}
              />
            )}
          />
          <Controller
            name="vendor"
            control={control}
            render={({ field }) => (
              <FormControl>
                <InputLabel id="codeInputLabel">Výrobce</InputLabel>
                <Select {...field} value={vendor === undefined ? "" : vendor}>
                  {Object.values(VENDORS).map((vendor) => (
                    <MenuItem key={`select-${vendor}`} value={vendor}>
                      {vendor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="model"
            control={control}
            rules={{
              required: "Toto pole je povinné",
            }}
            render={({ field }) => (
              <TextField
                id="model"
                {...field}
                label={"Model"}
                value={field.value || ""}
                required
                error={!!errors?.model}
                helperText={errors?.model ? errors.model.message : null}
              />
            )}
          />
          <Controller
            name="os"
            control={control}
            render={({ field }) => (
              <FormControl>
                <InputLabel id="osInputLabel">Operační systém</InputLabel>
                <Select {...field} value={system === undefined ? "" : system}>
                  {Object.values(OS).map((system) => (
                    <MenuItem key={`select-${system}`} value={system}>
                      {system}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="osVersion"
            control={control}
            render={({ field }) => (
              <TextField
                id="osVersion"
                {...field}
                label={"Verze operačního systému"}
                value={field.value || ""}
              />
            )}
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                id="image"
                {...field}
                label={"Obrázek"}
                value={field.value || ""}
              />
            )}
          />
          <Button type={"submit"}>Přidat zařízení</Button>
        </form>
      </Card>
      {snackBarState && (
        <Snackbar open={snackBarState.snackbar !== null}>
          <MuiAlert severity="success">
            {snackBarState.snackbar?.label}
          </MuiAlert>
        </Snackbar>
      )}
    </Template>
  );
};
