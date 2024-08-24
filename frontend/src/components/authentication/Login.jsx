import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/chatProvider";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const { setUser } = ChatState();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!formData.email || !formData.password) {
      toast({
        title: "Please fill in all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        formData,
        config
      );
      toast({
        title: "Login Successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);

      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"10px"}>
      <FormControl isRequired>
        <FormLabel fontWeight={"bold"}>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel fontWeight={"bold"}>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            type={showPassword ? "text" : "password"}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              background={"transparent"}
              width="5rem"
              size="md"
              onClick={() => setShowPassword(false)}
              onMouseDown={() => setShowPassword(true)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        marginTop={"15px"}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width={"100%"}
        onClick={() => {
          setFormData({
            email: "guest@example.com",
            password: "123456",
          });
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
