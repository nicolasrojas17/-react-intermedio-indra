import {
  Avatar,
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Stack,
  extendTheme
} from "@chakra-ui/react";
import Login from "../../components/Auth/Login";

const LoginPage = () => {
  const theme = extendTheme({
    colors: {
      brand: { 50: "#FFFFFF", 500: "#000000" },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Flex flexDirection="column" width="100wh" marginTop={"100px"} justifyContent="center" alignItems="center">
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Avatar />
          <Heading>Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <Login />
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  );
};

export default LoginPage;
