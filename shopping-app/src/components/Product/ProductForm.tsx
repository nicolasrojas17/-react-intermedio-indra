import {
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import CategoryIcon from "@mui/icons-material/Category";
import PercentIcon from "@mui/icons-material/Percent";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { useContext, useRef, useState } from "react";
import { Product } from "../../interfaces/Product";
import { fileToBase64 } from "../../util/utils";
import { themeChakra } from "../App";
import { StoreContext } from "../../hooks/StoreContextProvider";
import Swal from "sweetalert2";

const productSchema = Yup.object().shape({
  image: Yup.string().required("Campo requerido."),
  title: Yup.string().required("Campo requerido."),
  description: Yup.string().required("Campo requerido."),
  category: Yup.string().required("Campo requerido."),
  price: Yup.number().min(10000, "El precio debe ser mayor a 0.").required("Campo requerido."),
  discount: Yup.number().required("Campo requerido."),
});

interface FormValues {
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discount: number;
}

const initialValues: FormValues = { image: "", title: "", description: "", category: "", price: 0, discount: 0 };

export type ProductFormProps = {
  setOpenModal?: (value: boolean) => void;
};

const ProductForm = ({ setOpenModal }: ProductFormProps) => {
  const store = useContext(StoreContext);
  const { handleAddProduct } = store;
  const inputRef = useRef<any>();
  const [imageBase64, setImageBase64] = useState("");

  const onSubmit = async (values: FormValues) => {
    const newProduct = {
      ...values,
      image: imageBase64,
      priceDiscount: values.price - values.price * (values.discount / 100),
      rating: { rate: 0, count: 0 },
    } as Product;
    handleAddProduct(newProduct);
    if (setOpenModal) setOpenModal(false);
    Swal.fire({ title: "Added!", text: "Your product has been added.", icon: "success" });
  };

  const handleChangeImage = async (e: React.ChangeEvent<any>, handleChange: (e: React.ChangeEvent<any>) => void) => {
    handleChange(e);
    await fileToBase64(e.target.files[0], setImageBase64);
  };

  return (
    <ChakraProvider theme={themeChakra}>
      <Formik initialValues={initialValues} validationSchema={productSchema} onSubmit={onSubmit}>
        <Form>
          <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <BrokenImageIcon />
                </InputLeftElement>
                <Field name="image">
                  {({ field, form: { touched, errors, handleChange } }: any) => {
                    return (
                      <Flex width="100%" flexDirection={"column"}>
                        <Input
                          value={field.value}
                          paddingLeft={10}
                          type="text"
                          placeholder="Image"
                          onClick={() => inputRef.current?.click()}
                        />
                        <input
                          {...field}
                          type="file"
                          accept="image/*"
                          name="image"
                          ref={inputRef}
                          style={{ display: "none" }}
                          onChange={(e) => handleChangeImage(e, handleChange)}
                        />
                        {touched[field.name] && errors[field.name] && (
                          <FormHelperText color={"red.600"}>{errors[field.name]}</FormHelperText>
                        )}
                      </Flex>
                    );
                  }}
                </Field>
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <TextSnippetIcon />
                </InputLeftElement>
                <Field name="title">
                  {({ field, form: { touched, errors } }: any) => {
                    return (
                      <Flex width="100%" flexDirection={"column"}>
                        <Input {...field} paddingLeft={10} name="title" type="text" placeholder="Title" />
                        {touched[field.name] && errors[field.name] && (
                          <FormHelperText color={"red.600"}>{errors[field.name]}</FormHelperText>
                        )}
                      </Flex>
                    );
                  }}
                </Field>
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <TextSnippetIcon />
                </InputLeftElement>
                <Field name="description">
                  {({ field, form: { touched, errors } }: any) => {
                    return (
                      <Flex width="100%" flexDirection={"column"}>
                        <Input {...field} paddingLeft={10} name="description" type="text" placeholder="Description" />
                        {touched[field.name] && errors[field.name] && (
                          <FormHelperText color={"red.600"}>{errors[field.name]}</FormHelperText>
                        )}
                      </Flex>
                    );
                  }}
                </Field>
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CategoryIcon />
                </InputLeftElement>
                <Field name="category">
                  {({ field, form: { touched, errors } }: any) => {
                    return (
                      <Flex width="100%" flexDirection={"column"}>
                        <Input {...field} paddingLeft={10} name="category" type="text" placeholder="Category" />
                        {touched[field.name] && errors[field.name] && (
                          <FormHelperText color={"red.600"}>{errors[field.name]}</FormHelperText>
                        )}
                      </Flex>
                    );
                  }}
                </Field>
              </InputGroup>
            </FormControl>

            <FormControl display={"flex"} justifyContent={"space-between"}>
              <InputGroup width={"49%"}>
                <InputLeftElement pointerEvents="none">
                  <AttachMoneyIcon />
                </InputLeftElement>
                <Field name="price">
                  {({ field, form: { touched, errors } }: any) => {
                    return (
                      <Flex width="100%" flexDirection={"column"}>
                        <Input {...field} paddingLeft={10} name="price" type="number" placeholder="Price" />
                        {touched[field.name] && errors[field.name] && (
                          <FormHelperText color={"red.600"}>{errors[field.name]}</FormHelperText>
                        )}
                      </Flex>
                    );
                  }}
                </Field>
              </InputGroup>
              <InputGroup width={"49%"}>
                <InputLeftElement pointerEvents="none">
                  <PercentIcon />
                </InputLeftElement>
                <Field name="discount">
                  {({ field, form: { touched, errors } }: any) => {
                    return (
                      <Flex width="100%" flexDirection={"column"}>
                        <Input {...field} paddingLeft={10} name="discount" type="number" placeholder="Discount" />
                        {touched[field.name] && errors[field.name] && (
                          <FormHelperText color={"red.600"}>{errors[field.name]}</FormHelperText>
                        )}
                      </Flex>
                    );
                  }}
                </Field>
              </InputGroup>
            </FormControl>

            <Button borderRadius={0} type="submit" variant="solid" colorScheme="brand" width="full">
              Create
            </Button>
          </Stack>
        </Form>
      </Formik>
    </ChakraProvider>
  );
};

export default ProductForm;
