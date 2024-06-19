import { Backdrop, Box, Fade, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export type ModalCustomProps = {
  children: any;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ModalCustom = ({ children, open, setOpen }: ModalCustomProps) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
      closeAfterTransition
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={style} width={{ xs: "95%", sm: "80%", md: 650 }} mr={5}>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalCustom;
