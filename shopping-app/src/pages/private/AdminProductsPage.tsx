import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, TablePagination, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import ModalCustom from "../../components/Modal/Modal";
import ProductForm from "../../components/Product/ProductForm";
import { StoreContext } from "../../hooks/StoreContextProvider";
import { Product } from "../../interfaces/Product";
import { formatPrice } from "../../util/utils";

const AdminProductsPage = () => {
  const store = useContext(StoreContext);
  const { products, handleDeleteProduct } = store;
  const [modal, setModal] = useState<any>({ open: false, productId: null });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isEmpty = products.length === 0;

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProduct(id);
        Swal.fire({ title: "Deleted!", text: "Your product has been deleted.", icon: "success" });
      }
    });
  };

  return (
    <Box my={5}>
      <Box display={"grid"} gridTemplateColumns={{ md: "20% 80%", sm: "30% 70%" }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ height: "min-content" }}
          onClick={() => setModal({ open: true, productId: null })}
        >
          New Product
        </Button>
        <TablePagination
          width={"100%"}
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          sx={{ display: "block", border: "none", padding: "0" }}
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : products).map(
              (product: Product) => (
                <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="right" sx={{ maxWidth: "80px" }}>
                    <img
                      alt={product.title}
                      src={product.image.includes("http") ? product.image : `data:image/png;base64, ${product.image}`}
                      loading="lazy"
                      width={"100%"}
                      height={"50px !important"}
                      style={{ objectFit: "contain" }}
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: "150px" }}>{product.title}</TableCell>
                  <TableCell sx={{ maxWidth: "450px" }}>{product.description}</TableCell>
                  <TableCell sx={{ maxWidth: "100px" }} align="center">
                    {product.category}
                  </TableCell>
                  <TableCell sx={{ maxWidth: "80px" }} align="center">
                    {`$${formatPrice(product.price)}`}
                  </TableCell>
                  <TableCell sx={{ maxWidth: "50px" }} align="center">
                    {product.discount}%
                  </TableCell>
                  <TableCell sx={{ maxWidth: "80px" }} align="center">
                    <IconButton aria-label="edit" onClick={() => setModal({ open: true, productId: product.id })}>
                      <EditIcon color="info" />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(product.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
            {isEmpty && (
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell colSpan={7} align="center">
                  No products
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalCustom open={modal.open} setOpen={() => setModal({ open: false, productId: null })}>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          New Product
        </Typography>
        <ProductForm setModal={setModal} modal={modal} />
      </ModalCustom>
    </Box>
  );
};

export default AdminProductsPage;
