import { IDevice } from "../../../Models/Device";
import { Box, Button, Card, Typography } from "@material-ui/core";
import { useStyles } from "./PhoneCard.styles";

interface IPhoneCard {
  phone: IDevice;
  isBorrowedByMe?: boolean;
  borrowDevice: (id: string) => void;
  returnDevice: (id: string) => void;
}

export const PhoneCard = ({
  phone,
  isBorrowedByMe,
  borrowDevice,
  returnDevice,
}: IPhoneCard) => {
  const classes = useStyles();
  let borrowedDate: Date | null = null;
  if (phone.borrowed !== undefined) {
    borrowedDate = new Date(phone.borrowed.date);
  }

  return (
    <Card className={classes.root}>
      {phone.image && <img src={phone.image} alt={phone.model} width={100} />}
      {!phone.image && (
        <img
          src={`${process.env.PUBLIC_URL}/images/No_image_available.jpg`}
          alt={phone.model}
          width={150}
        />
      )}
      <Box className={classes.cardBottom}>
        {borrowedDate && (
          <Box className={classes.borrowedOverlay}>
            <Typography
              component={"span"}
              variant={"body1"}
              color={"textPrimary"}
            >{`${borrowedDate.toLocaleDateString()}, ${borrowedDate.getHours()}:${borrowedDate.getMinutes()}`}</Typography>
          </Box>
        )}
        <Typography className={classes.phoneName} variant={"h6"} align={"left"}>
          {phone.model}
        </Typography>
        <Typography
          className={classes.phoneVendor}
          variant={"body1"}
          align={"left"}
          component={"p"}
        >
          {phone.vendor}
        </Typography>
        <Typography
          className={classes.phoneOs}
          variant={"caption"}
          align={"left"}
          component={"p"}
        >
          {phone.os}/{phone.osVersion}
        </Typography>
        {!isBorrowedByMe && (
          <Button
            color={"primary"}
            disabled={
              phone.borrowed !== undefined && phone.borrowed.date !== null
            }
            variant={"outlined"}
            onClick={() => borrowDevice(phone.id)}
          >
            Půjčit
          </Button>
        )}
        {isBorrowedByMe && (
          <Button
            color={"primary"}
            variant={"outlined"}
            onClick={() => returnDevice(phone.id)}
          >
            Vrátit
          </Button>
        )}
      </Box>
    </Card>
  );
};
