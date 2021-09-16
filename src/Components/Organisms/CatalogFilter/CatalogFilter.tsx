import { IDevice } from "../../../Models/Device";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { buildFilter, filterData } from "../../../Utils/Filter/BuildFilter";
import { useStyles } from "./CatalogFilter.styles";

interface ICatalogFilterProps {
  phones: IDevice[];
  setPhones: (phones: IDevice[]) => void;
}

export interface ICatalogFilter {
  [key: string]: string | undefined;
}

export const CatalogFilter = ({ phones, setPhones }: ICatalogFilterProps) => {
  const classes = useStyles();
  const Systems = Array.from(new Set(phones.map((phone) => phone.os)));
  const Vendors = Array.from(new Set(phones.map((phone) => phone.vendor)));

  const { handleSubmit, control, getValues } = useForm();

  const vendor = useWatch({ control, name: "vendor" });
  const system = useWatch({ control, name: "os" });
  const isAvailable = useWatch({ control, name: "isAvailable" });
  const model = useWatch({ control, name: "model" });

  const handleSubmitForm = () => {
    const values = getValues();
    const query = buildFilter(values);
    const result: IDevice[] = filterData(phones, query);
    setPhones(result);
  };

  useEffect(() => {
    handleSubmitForm();
  }, [vendor, system, isAvailable, model]);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className={classes.form}>
      <Controller
        name="os"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel id="osInputLabel">Operační systém</InputLabel>
            <Select
              {...field}
              value={system === undefined ? "" : system}
              label={"Operační systém"}
            >
              {Systems.map((system) => (
                <MenuItem key={`select-${system}`} value={system}>
                  {system}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="vendor"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel id="vendorInputLabel">Výrobce</InputLabel>
            <Select
              {...field}
              value={vendor === undefined ? "" : vendor}
              defaultValue={""}
            >
              {Vendors.map((vendor) => (
                <MenuItem key={`select-${vendor}`} value={vendor}>
                  {vendor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="isAvailable"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            {...field}
            control={<Checkbox name="isAvailable" />}
            label="Jen dostupné"
          />
        )}
      />
      <Controller
        name="model"
        control={control}
        render={({ field }) => (
          <TextField {...field} id="model" label="Model" />
        )}
      />
    </form>
  );
};
