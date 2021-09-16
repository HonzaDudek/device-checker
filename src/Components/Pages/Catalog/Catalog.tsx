import { AXIOS_METHODS, useCallApi } from "../../../Hooks/callAPI";
import { CircularProgress, Grid } from "@material-ui/core";
import { Template } from "../../Templates/Template";
import { useEffect, useMemo, useState } from "react";
import { useUserContext } from "../../../Context/UserContext";
import { IDevice } from "../../../Models/Device";
import { User } from "../../../Models/User";
import { PhoneCard } from "../../Organisms/PhoneCard/PhoneCard";
import { CatalogFilter } from "../../Organisms/CatalogFilter/CatalogFilter";
import { useDevicesContext } from "../../../Context/phonesContext";
import deviceService from "../../../Services/device.service";
import { useStyles } from "./Catalog.styles";

export const CatalogPage = () => {
  const { state, dispatch } = useUserContext();
  const { dispatch: deviceDispatch } = useDevicesContext();
  const classes = useStyles();
  const [user, setUser] = useState<User | null>(state.user);
  const [phones, setPhones] = useState<IDevice[]>();
  const [filteredPhones, setFilteredPhones] = useState<IDevice[]>();

  useEffect(() => {
    if (!state.user) {
      const localUser = localStorage.getItem("user");
      if (localUser !== null) {
        const parsedLocalUser = JSON.parse(localUser);
        dispatch({ type: "login", payload: parsedLocalUser });
        setUser(parsedLocalUser);
      }
    }
  }, []);

  const requestConfig = useMemo(
    () => ({
      url: "phones",
      method: AXIOS_METHODS.GET,
      body: null,
      headers: {
        "Auth-Token": user?.token,
      },
    }),
    [state]
  );

  const { isLoading, response } = useCallApi<IDevice[]>(requestConfig);

  useEffect(() => {
    if (response) {
      setPhones(response);
      setFilteredPhones(response);
      deviceDispatch({ type: "loadDevices", payload: response });
    }
  }, [response]);

  const updatePhones = (phone: IDevice, phones: IDevice[]) => {
    const updatedDevice = phone;
    const updatedArray: IDevice[] = phones.map((phone) =>
      phone.code === updatedDevice.code ? updatedDevice : phone
    );
    setFilteredPhones([...updatedArray]);
  };

  const handleBorrowDevice = (id: string) => {
    if (user && filteredPhones) {
      deviceService.borrowDevice(id, user.token).then((res) => {
        updatePhones(res.data, filteredPhones);
      });
    }
  };

  const handleReturnDevice = (id: string) => {
    if (user && filteredPhones) {
      deviceService.returnDevice(id, user.token).then((res) => {
        if (res.status === 200) {
          updatePhones(res.data, filteredPhones);
        }
      });
    }
  };

  return (
    <Template>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
          {response && filteredPhones && (
            <>
              <CatalogFilter phones={response} setPhones={setFilteredPhones} />
              <Grid
                container
                className={classes.root}
                justifyContent="center"
                spacing={0}
              >
                {filteredPhones &&
                  filteredPhones.map((phone: IDevice) => (
                    <PhoneCard
                      key={`${phone.id}`}
                      phone={phone}
                      isBorrowedByMe={
                        phone.borrowed?.user?.id === state.user?.id
                      }
                      borrowDevice={handleBorrowDevice}
                      returnDevice={handleReturnDevice}
                    />
                  ))}
              </Grid>
            </>
          )}
        </>
      )}
    </Template>
  );
};
