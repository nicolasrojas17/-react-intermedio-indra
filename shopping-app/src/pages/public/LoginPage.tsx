import {
  Avatar,
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Stack
} from "@chakra-ui/react";
import { themeChakra } from "../../components/App";
import LoginForm from "../../components/Auth/LoginForm";

const LoginPage = () => {

  return (
    <ChakraProvider theme={themeChakra}>
      <Flex flexDirection="column" width="100wh" marginTop={"100px"} justifyContent="center" alignItems="center">
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Avatar />
          <Heading>Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <LoginForm />
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  );
};

export default LoginPage;
