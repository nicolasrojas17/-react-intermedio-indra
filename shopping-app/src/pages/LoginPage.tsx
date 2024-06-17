import {
  Avatar,
  Box,
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  extendTheme,
} from "@chakra-ui/react";
import HttpsIcon from "@mui/icons-material/Https";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const theme = extendTheme({
    colors: {
      brand: {
        50: "#FFFFFF",
        500: "#000000", 
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Flex flexDirection="column" width="100wh" marginTop={"100px"} justifyContent="center" alignItems="center">
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Avatar />
          <Heading>Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <PersonIcon />
                    </InputLeftElement>
                    <Input type="email" placeholder="email address" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <HttpsIcon />
                    </InputLeftElement>
                    <Input type={showPassword ? "text" : "password"} placeholder="Password" />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick} bg={"none"} _hover={"none"}>
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button borderRadius={0} type="submit" variant="solid" colorScheme="brand" width="full">
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          New to us?{" "}
          <Link color="teal.500" href="#">
            Sign Up
          </Link>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default LoginPage;
