import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Modal, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Product } from "../../interfaces/Product";
import { formatPrice } from "../../util/utils";
import CardDiscount from "./CardDiscount";

export type CardModalInfoProps = {
  product: Product;
  altImg: string;
  amount: number;
  openModalInfo: boolean;
  handleAddToCart: () => void;
  handleRemoveFromCart: () => void;
  setOpenModalInfo: (open: boolean) => void;
};

const CardModalInfo = (props: CardModalInfoProps) => {
  const { product, altImg, amount, openModalInfo } = props;
  const { handleAddToCart, handleRemoveFromCart, setOpenModalInfo } = props;

  const handleClose = () => setOpenModalInfo(false);

  return (
    <Modal
      open={openModalInfo}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{ transform: "translate(-50%, -50%)" }}
        p={5}
        width={{ xs: "90%", sm: "80%", md: "600px" }}
        boxShadow={24}
        borderRadius={2}
        bgcolor={"background.paper"}
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        display={{ xs: "block", md: "flex" }}
        alignItems={"center"}
      >
        {product.discount > 0 && (
          <Stack direction="row" width={100} position={"absolute"} top={"60px"}>
            <CardDiscount discount={product.discount} color="success" />
          </Stack>
        )}

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box width={{ xs: "100%", md: "50%" }} height={{ xs: "300px", md: "100%" }} mr={2}>
          <img
            alt={altImg}
            src={product.image}
            loading="lazy"
            width={"100%"}
            style={{ objectFit: "contain", height: "-webkit-fill-available" }}
          />
        </Box>
        <Box width={{ xs: "100%", md: "50%" }} ml={2}>
          <Typography variant="h5" fontWeight={"bold"} mx={1} my={3}>
            {product.title}
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} py={2}>
            <Box>
              {product.discount > 0 ? (
                <>
                  <Typography variant="h6" px={2}>{`$ ${formatPrice(product.priceDiscount)}`}</Typography>
                  <Typography variant="body2" px={2} sx={{ textDecoration: "line-through" }}>{`$ ${formatPrice(
                    product.price
                  )}`}</Typography>
                </>
              ) : (
                <Typography variant="h6" px={2}>{`$ ${formatPrice(product.priceDiscount)}`}</Typography>
              )}
            </Box>
            <Box display={"flex"} alignItems={"center"} pr={2}>
              <IconButton onClick={handleRemoveFromCart}>
                <RemoveIcon color="inherit" />
              </IconButton>
              <Typography variant="body1">{amount}</Typography>
              <IconButton onClick={handleAddToCart}>
                <AddIcon color="inherit" />
              </IconButton>
            </Box>
          </Box>
          <Button sx={{ width: "100%", my: 2 }} variant="outlined" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CardModalInfo;
