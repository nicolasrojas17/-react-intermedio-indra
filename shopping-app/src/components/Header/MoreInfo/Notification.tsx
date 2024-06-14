import { Badge, Box, IconButton, Typography } from "@mui/material";
import { ReactElement } from "react";

export type NotificationProps = {
  icon: ReactElement;
  numberOfNotifications?: number;
  onclick?: () => void;
  text?: string;
  colorIcon?: "secondary" | "inherit";
};

const Notification = ({ icon, numberOfNotifications = 0, text, onclick, colorIcon }: NotificationProps) => {
  return (
    <Box onClick={onclick}>
      <IconButton size="large" aria-label={`show ${numberOfNotifications} new notifications`} color={colorIcon}>
        <Badge badgeContent={numberOfNotifications} color="error">
          {icon}
        </Badge>
      </IconButton>
      {text ?? <Typography variant="body1">{text}</Typography>}
    </Box>
  );
};

export default Notification;
