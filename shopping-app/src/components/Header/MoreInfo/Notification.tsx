import { Badge, Box, IconButton, Typography } from "@mui/material";
import { ReactElement } from "react";

export type NotificationProps = {
  icon: ReactElement;
  numberOfNotifications: number;
  onclick?: () => void;
  text?: string;
};

const Notification = ({ icon, numberOfNotifications, text, onclick }: NotificationProps) => {
  return (
    <Box onClick={onclick}>
      <IconButton size="large" aria-label={`show ${numberOfNotifications} new notifications`} color="inherit">
        <Badge badgeContent={numberOfNotifications} color="error">
          {icon}
        </Badge>
      </IconButton>
      {text ?? <Typography variant="body1">{text}</Typography>}
    </Box>
  );
};

export default Notification;
